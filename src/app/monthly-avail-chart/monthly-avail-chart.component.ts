import { Component, OnChanges, Input, ElementRef, SimpleChange } from '@angular/core';
import { DashboardTilesAPIComponent } from '../api/dashboard-api.service';
import { DashboardFacadeComponent } from '../api/dashboard-facade';
// import type { ECActionEvent } from 'echarts/types/src/util/types';
// import type { ECElementEvent, EChartsOption } from 'echarts';


import * as echarts from 'echarts';

export interface HeatOptions {
  name: number;
  values: [];
}

export interface MarketWeeks {
  key: number;
  value: any[]
}


@Component({
  selector: 'monthly-availability',
  templateUrl: './monthly-avail-chart.component.html',
  styleUrls: ['./monthly-avail-chart.component.scss']
})

export class MonthlyAvailComponent {

  public myChart0: any = null;

  public options: any = {};

  public heatmapData: HeatOptions[] = [];

  public heatmapValuesWeeklyAggregate: any[] = [];

  public chartTheme = 'dark';

  public yDays: any[] = [];

  public hoursArray: any[] = [];

  public days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday ', 'Friday', 'Saturday', 'Sunday'
  ];

  public marketByWeeks: MarketWeeks[] = [];

  public widthObserver: any;

  public marketDataValues: any[] = [];

  public maxValueForVisualMap: number = 0;

  public allWeeks: any[] = [];

  public selectedMetric = 0;

  public kpiMetricCompare = [
    { id: 0, value: 'Count' },
    { id: 1, value: 'AvgFare' },
    { id: 2, value: 'Revenue' }];


  //public myValueToggle = ['First'];


  @Input()
  public themeSelectInput: string;


  constructor(public dashboardTilesAPIComponent: DashboardTilesAPIComponent, private dashboardFacade: DashboardFacadeComponent, private host: ElementRef) {
    this.setupEventListeners();
  }



  private setupEventListeners() {
    this.dashboardTilesAPIComponent.getMarketCsvData(this.dashboardTilesAPIComponent.Tiles_Heatmap)
      .subscribe((tilesHeatmap: any[]) => {
        console.log(' MARKET Total ', tilesHeatmap)
      })



    this.dashboardTilesAPIComponent.getCsvData(this.dashboardTilesAPIComponent.Market_Values)
      .subscribe((marketData: any[]) => {
        //console.log('marketData ', marketData)

        this.marketDataValues = marketData;

        let activeWeeks: any[] = [];

        let weeksCount: any[] = [];

        marketData.forEach((m, i) => {

          if (!activeWeeks.includes(m.Week)) {
            activeWeeks.push(m.Week)
          }

          if (!weeksCount.includes(m.WeekDay)) {
            weeksCount.push(m.WeekDay)
            this.yDays.push(m.WeekDay)
          }


          if (!this.hoursArray.includes(m.Hour + 1)) {
            this.hoursArray.push(m.Hour + 1)
          }

        })

        this.allWeeks = activeWeeks;

        this.heatmapValuesWeeklyAggregate = this.returnWeeklyValues(activeWeeks);

        console.log('holder  ', this.heatmapValuesWeeklyAggregate)

        this.heatmapData = this.heatmapValuesWeeklyAggregate.map((t: any, e: number) => {
          const flatValueArrays = this.returnDailyMetricValuesFlat(t, this.kpiMetricCompare[this.selectedMetric].value);
          return { name: activeWeeks[e], values: flatValueArrays }
        })


        console.log('this.heatmapData  ', this.heatmapData)

        setTimeout(() => {
          this.createSvg();
        }, 1000);

      })
  }


  // Flattens Values into WeekDay by Week arrays
  public returnDailyMetricValuesFlat(marketWeek: any, metric: string): any {

    console.log('marketWeek ', marketWeek, ' length ', this.marketDataValues.length)

    let newArray: any[] = [];

    marketWeek.values.forEach((m: any, x: number) => {
      for (let e = 0; e < this.yDays.length; e++) {
        if (this.yDays[e] === m.WeekDay) {
          newArray.push([m.Hour, m.WeekDay - 1, m[metric]]);
        }
      }
    })

    this.maxValueForVisualMap = Math.max(...[].concat(...newArray));
    return newArray;

  }

  // From Metric Dropdown
  public generateMetricSpecificValues() {

    this.heatmapData = this.heatmapValuesWeeklyAggregate.map((t: any, e: number) => {
      //console.log(' t  ', this.kpiMetricCompare[this.selectedMetric].value)
      const flatValueArrays = this.returnDailyMetricValuesFlat(t, this.kpiMetricCompare[this.selectedMetric].value);
      return { name: this.allWeeks[e], values: flatValueArrays }
    })
    setTimeout(() => {
      this.setChart()
    }, 0);
  }


  public selectMetric(event: any) {
    this.selectedMetric = event.id;
    this.generateMetricSpecificValues()
  }




  public returnWeeklyValues(marketWeek: any[]): any {

    let WeeklyCollection: any = [];

    let dataMap: any = {};

    marketWeek.forEach((f: any, i: number) => {
      dataMap = {};
      dataMap.name = marketWeek[i];
      dataMap.values = this.returnMetricValues(f);
      WeeklyCollection[i] = dataMap
    })

    //console.log('dataMap ', dataMap)
    return WeeklyCollection;
  }





  // Places values in Week Arrays
  public returnMetricValues(marketWeek: any): any {
    return this.marketDataValues.filter((m, x) => {

      if (marketWeek === m.Week) {
        //console.log('m ', m, ' x ', x)
        return m
      }

    })
  }





  public ngOnDestroy(): void {
    //this.widthObserver.unobserve(this.targetElement);
  }


  public createSvg() {

    const chart: HTMLCanvasElement = document.getElementById('monthly-available') as HTMLCanvasElement;
    this.myChart0 = echarts.init(chart);

    setTimeout(() => {
      this.setChart()
    }, 0);

  }



  public setChart() {
    const self = this;

    this.myChart0.setOption(
      {
        notMerge: false,
        animation: true,
        animationDuration: 1000,
        timeline: {
          currentIndex: 0,
          data: this.allWeeks,
          calculable: true,
          label: {
            formatter: function (s: any) {
              return String(s)
            }
          },
          autoPlay: false,
          playInterval: 3000,
          //replaceMerge: ['xAxis', 'series'],
        },
        grid: {
          right: 20,
          left: 60,
          top: 30,
          bottom: 70,
        },
        xAxis:
        {
          type: 'category',
          //axisLabel: { interval: 1 },
          data: this.hoursArray,
          //name: 'Hour',
          splitLine: { show: true }
        },
        yAxis:
        {
          type: 'category',
          data: this.yDays.map((d: any, i: number) => {
            return d
          }),
          //name: 'Week',
        },
        options: [
          {
            title: {
              'text': 'Week 48',
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
              min: 0,
              max: this.maxValueForVisualMap,
              text: ['High', 'Low'],
              calculable: true,
              x: 'left',

              color: [
                '#313695',
                '#4575b4',
                '#74add1',
                '#abd9e9',
                '#e0f3f8',
                '#ffffbf',
                '#fee090',
                '#fdae61',
                '#f46d43',
                '#d73027',
                '#a50026'
              ]

            },
            series: [
              {
                title: { 'text': 'Week 48' },
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
                label: {
                  show: true
                },
                data: this.heatmapData[0].values
              },

            ]
          },
          {
            title: { 'text': 'Week 49' },
            type: 'heatmap',
            universalTransition: {
              enabled: true,
              divideShape: 'split',
              delay: function (index: any, count: any) {
                console.log('index ', index, ' count ', count)
                return Math.random() * 1000;
              }
            },
            series: [

              // data: this.heatmapData[1].values.map((v: any, i: number) => {

              //   return v[this.kpiMetricCompare[this.selectedMetric].value]

              // }) 

              { data: this.heatmapData[1].values }
            ]
          },
          {
            title: { 'text': 'Week 50' },
            type: 'heatmap',
            series: [
              { data: this.heatmapData[2].values }
            ]
          },
          {
            title: { 'text': 'Week 51' },
            type: 'heatmap',
            series: [
              { data: this.heatmapData[3].values }
            ]
          },
        ]
      })
  }
}
