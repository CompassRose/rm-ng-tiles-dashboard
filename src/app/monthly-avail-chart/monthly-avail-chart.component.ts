import { Component, OnChanges, Input, OnDestroy } from '@angular/core';
import { DashboardTilesAPIComponent } from '../api/dashboard-api.service';
import { DashboardFacadeComponent } from '../api/dashboard-facade';
import { fromEvent, interval, Observable, of, BehaviorSubject, Subscription } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { ContinousColors, ColorObject } from '../dashboard-constants';
import * as echarts from 'echarts';
import { ChartColorService } from '../api/color-manager';
import { ShortNumberPipe } from '../shared/pipes/short-number-pipe';


export interface HeatOptions {
  name: number;
  minMax: number[];
  values: [];
}

export interface MarketWeeks {
  key: number;
  value: any[]
}


@Component({
  selector: 'monthly-availability',
  templateUrl: './monthly-avail-chart.component.html',
  styleUrls: ['./monthly-avail-chart.component.scss'],
  providers: [ShortNumberPipe]
})

export class MonthlyAvailComponent implements OnDestroy {

  public myChart1: any = null;

  public options: any = {};

  public heatmapData: HeatOptions[] = [];

  public heatmapDataMarket: HeatOptions[] = [];

  public heatmapDataTotals: HeatOptions[] = [];

  public heatmapValuesWeeklyAggregate: any[] = [];

  public heatmapValuesWeeklyTotalsAggregate: any[] = [];

  public chartTheme = 'dark';

  public yDays: any[] = [];

  public hoursArray: any[] = [];

  public colorRampConstants: any[] = [];

  // Full list of color options for dropdown
  public colorCollections: ColorObject[] = ContinousColors;

  // Selected Color ramp
  public colorRange: any;

  public selectedColorIndex: number = 0;

  public days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday ', 'Friday', 'Saturday', 'Sunday'
  ];

  public widthObserver: any;

  public marketDataValues: any[] = [];

  public marketDataTotalsValues: any[] = [];

  public minMaxValueForVisualMap: number[] = [];

  public allWeeks: any[] = [];

  public colorIdx = null;

  public selectedMetric = 0;

  public marketMetricState = true;

  public kpiMetricCompare = [
    { id: 0, value: 'Count', name: 'Count' },
    { id: 1, value: 'AvgFare', name: 'Average Fare' },
    { id: 2, value: 'Revenue', name: 'Revenue' }];

  public timelineSubscription: Subscription;
  public timelineChange$ = new BehaviorSubject<any>(0);
  public timelineIndex = 0;

  @Input()
  public themeSelectInput: string;



  constructor(public dashboardTilesAPIComponent: DashboardTilesAPIComponent, public chartColorService: ChartColorService, public shortNumberPipe: ShortNumberPipe) {

    this.colorCollections = ContinousColors;

    if (!JSON.parse(window.localStorage.getItem('colorRange')!)) {
      this.colorRange = this.colorCollections[0];
      this.colorIdx = 0;
      window.localStorage.setItem('colorRange', JSON.stringify(this.colorIdx));
    } else {
      console.log('ELSE  this.colorRange ', this.colorRange)
      this.colorIdx = JSON.parse(window.localStorage.getItem('colorRange')!);
      this.colorRange = this.colorCollections[this.colorIdx];

    }


    console.log('this.colorRange ', this.colorRange)
    this.setupEventListeners();
  }



  private setupEventListeners() {

    // this.chartColorService.setFareClassNumberToColorScheme(12)



    this.dashboardTilesAPIComponent.getMarketCsvData(this.dashboardTilesAPIComponent.Market_Values)
      .subscribe((tilesHeatmap: any[]) => {

        this.marketDataTotalsValues = tilesHeatmap;

        setTimeout(() => {
          this.heatmapValuesWeeklyTotalsAggregate = this.returnWeeklyValues(this.allWeeks, this.marketDataTotalsValues);
          this.heatmapDataTotals = this.generateMetricSpecificValues(this.heatmapValuesWeeklyTotalsAggregate, false);
        }, 500);

      })



    this.dashboardTilesAPIComponent.getCsvData(this.dashboardTilesAPIComponent.Tiles_Heatmap)
      .subscribe((marketData: any[]) => {

        this.marketDataValues = marketData;

        marketData.forEach((m, i) => {

          if (!this.allWeeks.includes(m.Week)) {
            this.allWeeks.push(m.Week)
          }

          if (!this.yDays.includes(m.WeekDay)) {
            this.yDays.push(m.WeekDay)
          }

          if (!this.hoursArray.includes(m.Hour + 1)) {
            this.hoursArray.push(m.Hour + 1)
          }

        })

        this.heatmapValuesWeeklyAggregate = this.returnWeeklyValues(this.allWeeks, this.marketDataValues);
        this.heatmapDataMarket = this.generateMetricSpecificValues(this.heatmapValuesWeeklyAggregate, true);
        this.heatmapData = this.heatmapDataMarket;

        console.log('this.heatmapData  ', this.heatmapData)

        this.createSvg();
      })
  }



  public returnWeeklyValues(marketWeek: any[], collectionStr: any): any {

    let WeeklyCollection: any = [];

    let dataMap: any = {};

    marketWeek.forEach((f: any, i: number) => {
      dataMap = {};
      dataMap.name = marketWeek[i];
      dataMap.values = this.returnMetricValues(f, collectionStr);
      WeeklyCollection[i] = dataMap
    })

    console.log('dataMap ', dataMap)
    return WeeklyCollection;
  }



  // From Metric Dropdown
  public generateMetricSpecificValues(collection: any, fromTemplate: boolean): any {

    //console.log('generateMetricSpecific collection  ', collection[this.selectedMetric], ' this.selectedMetric ', this.selectedMetric, ' kpiMetricCompare ', this.kpiMetricCompare[this.selectedMetric].value)

    const maxValue = Math.max(...collection[this.selectedMetric].values.map((o: any) => {
      return o[this.kpiMetricCompare[this.selectedMetric].value]
    }));

    const minValue = Math.min(...collection[this.selectedMetric].values.map((o: any) => {
      return o[this.kpiMetricCompare[this.selectedMetric].value]
    }));

    this.minMaxValueForVisualMap = [minValue, maxValue];

    console.log('maxValue minMaxValueForVisualMap  ', this.minMaxValueForVisualMap)


    const returnedCollection = collection.map((t: any, e: number) => {
      const flatValueArrays = this.returnDailyMetricValuesFlat(t, this.kpiMetricCompare[this.selectedMetric].value);
      return { name: this.allWeeks[e], minMax: this.minMaxValueForVisualMap, values: flatValueArrays }
    })


    if (fromTemplate) {
      setTimeout(() => {
        this.setChart()
      }, 0);
    }
    // console.log('returnedCollection ', returnedCollection, ' maxValue ')
    return returnedCollection;
  }



  // Flattens Values into WeekDay by Week arrays
  public returnDailyMetricValuesFlat(marketWeek: any, metric: string): any {

    let newArray: any[] = [];

    marketWeek.values.forEach((m: any, i: number) => {
      for (let e = 0; e < this.yDays.length; e++) {
        if (this.yDays[e] === m.WeekDay) {
          newArray.push([m.Hour, m.WeekDay - 1, Math.floor(m[metric])]);
        }
      }
    })
    return newArray;
  }



  public selectMetric(event: any) {
    this.selectedMetric = event.id;
    console.log('selectMetric ', this.selectedMetric, ' this.marketMetricState ', this.marketMetricState)

    if (!this.marketMetricState) {
      this.heatmapData = this.generateMetricSpecificValues(this.heatmapValuesWeeklyTotalsAggregate, true);
    } else {
      this.heatmapData = this.generateMetricSpecificValues(this.heatmapValuesWeeklyAggregate, true);
    }
  }


  // On Theme change Dark/Light
  public onModeChange(event: any) {

    this.marketMetricState = !this.marketMetricState;

    // console.log('********************   onModeChange this.selectedMetric  ', this.timelineIndex, ' marketMetricState ', this.marketMetricState, ' event ', event.checked, ' minMaxValueForVisualMap ', this.minMaxValueForVisualMap)

    if (!this.marketMetricState) {

      this.heatmapData = this.heatmapDataTotals;
    } else {
      this.heatmapData = this.heatmapDataMarket
    }
    console.log(' this.marketMetricState ', this.timelineIndex, ' selectedMetric ', this.heatmapData)
    this.setChart()
  }


  // Places values in Week Arrays
  public returnMetricValues(marketWeek: any, collectionStr: any): any {
    // console.log('collectionStr ', ' marketWeek ', marketWeek, ' collectionStr ', collectionStr)

    return collectionStr.filter((m: any, x: number) => {

      if (marketWeek === m.Week) {

        return m
      }
    })
  }



  public ngOnDestroy(): void {
    console.log('ngOnDestroy ngOnDestroy ||||||||||||||||||| ')
    //this.widthObserver.unobserve(this.targetElement);
    // this.timelineSubscription.unsubscribe();
  }


  public createSvg() {

    const chart: HTMLCanvasElement = document.getElementById('market-study') as HTMLCanvasElement;
    this.myChart1 = echarts.init(chart);

    const timelineChange$ = fromEvent(this.myChart1, 'timelinechanged');


    this.timelineSubscription = timelineChange$.pipe(
      map((event: any) => {
        console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\event ', event)

        return event.currentIndex
      }
      ),
      startWith(0),
      switchMap((index: any) => {
        //console.log('timelineSubscription index ', index)
        this.timelineIndex = index
        return of(index);
      })
    ).subscribe(options => {
      console.log('options ', options)
      if (this.myChart1) {
        //this.setChart();
      }
      // this.myChart1.setOption(options);
    });
  }


  // From color range dropdown
  public selectColorRange(ev: ColorObject): void {
    const rangeIdx = ContinousColors.findIndex(r => r.key === ev.key);
    this.colorRange = ContinousColors[rangeIdx];
    window.localStorage.setItem('colorRange', JSON.stringify(rangeIdx));

    if (this.myChart1) {
      this.setChart();
    }
  }


  public setChart() {
    console.log('setChart setChart setChart')
    const self = this;

    this.myChart1.setOption(
      {
        notMerge: false,
        animation: true,
        animationDuration: 500,
        timeline: {
          axisType: 'category',
          calculable: true,
          currentIndex: 0,
          data: this.allWeeks,
          label: {
            formatter: (params: any) => {
              return params
            }
          },
          autoPlay: false,
          playInterval: 3000,
        },
        grid: {
          right: 10,
          left: 25,
          top: 55,
          bottom: 70,
        },
        xAxis:
        {
          type: 'category',
          data: this.hoursArray,
          splitLine: { show: true }
        },
        yAxis:
        {
          type: 'category',
          data: this.yDays.map((d: any, i: number) => {
            return d
          }),
        },

        tooltip: {
          position: 'top',
          appendToBody: true,
          confine: false,
          borderWidth: 2,
          padding: 5,
          extraCssText: 'box-shadow: 0 2px 6px rgba(0, 0, 0, 0.85);',
          textStyle: {
            fontSize: 12,
            color: 'black'
          },

          formatter: (params => {

            let kpiMetric = '';
            let toolTipString = '';

            if (params.componentSubType === 'heatmap') {
              kpiMetric = `${this.kpiMetricCompare[this.selectedMetric].value}:  ${params.data[2]}`;
              toolTipString = `<strong>${kpiMetric}</strong><br>Week:${params.data[1]}<br>Hour:  ${params.data[0]}`;
            } else {
              // console.log('params ', params, '\n kpi ', this.kpiMetricCompare[this.selectedMetric].value)
              toolTipString = `Week: ${params.name}`
            }
            return toolTipString;
          })
        },

        options: [
          {
            title: {
              'text': 'Week 47',
              textStyle: {
                fontSize: 14
              }
            },
            tooltip: { 'trigger': 'item' },
            toolbox: {
              'show': false,
              'feature': {
                'mark': { 'show': true },
                'dataView': { 'show': true, 'readOnly': false },
                'restore': { 'show': true },
                'saveAsImage': { 'show': true }
              }
            },
            dataRange: {
              min: this.heatmapData[this.timelineIndex].minMax[0],
              max: this.heatmapData[this.timelineIndex].minMax[1],
              orient: 'horizontal',
              calculable: true,
              x: 'center',
              top: 0,
              color: this.colorRange.value
            },

            series: [
              {
                title: { 'text': `Week 47` },
                name: this.heatmapData[0].name,
                type: 'heatmap',
                universalTransition: {
                  enabled: true,
                  divideShape: 'split',
                  delay: function (index: any, count: any) {
                    console.log('index ', index, ' count ', count)
                    return Math.random() * 1000;
                  }
                },
                animation: true,
                data: this.heatmapData[0].values,
                label: {
                  show: true,
                  fontSize: 10,
                  formatter: (param: any) => {
                    //console.log('447 params ', param.data[2])
                    return this.shortNumberPipe.transform(param.data[2]);
                  }
                }
              },
            ]
          },
          {
            title: { 'text': 'Week 48' },
            type: 'heatmap',
            series: [
              {
                data: this.heatmapData[0].values,
                label: {
                  show: true,
                  fontSize: 10,
                  formatter: (param: any) => {
                    return this.shortNumberPipe.transform(param.data[2]);
                  }
                }
              }
            ]
          },
          {
            title: { 'text': 'Week 49' },
            type: 'heatmap',
            series: [
              {
                data: this.heatmapData[1].values,
                label: {
                  show: true,
                  fontSize: 10,
                  formatter: (param: any) => {
                    return this.shortNumberPipe.transform(param.data[2]);
                  }
                }
              }
            ]
          },
          {
            title: { 'text': 'Week 50' },
            type: 'heatmap',
            series: [
              {
                data: this.heatmapData[2].values,
                label: {
                  show: true,
                  fontSize: 10,
                  formatter: (param: any) => {
                    return this.shortNumberPipe.transform(param.data[2]);
                  }
                }
              }
            ]
          },
          {
            title: { 'text': 'Week 51' },
            type: 'heatmap',
            universalTransition: {
              enabled: true,
              divideShape: 'split',
              delay: function (index: any, count: any) {
                //console.log('index ', index, ' count ', count)
                return Math.random() * 1000;
              }
            },
            series: [
              {
                data: this.heatmapData[3].values,
                label: {
                  show: true,
                  fontSize: 10,
                  formatter: (param: any) => {
                    return this.shortNumberPipe.transform(param.data[2]);
                  }
                }
              }
            ]
          },
        ]
      })
  }
}
