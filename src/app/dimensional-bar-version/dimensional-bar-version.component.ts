import { Component, OnChanges, Input, ElementRef, SimpleChange } from '@angular/core';
import { DashboardTilesAPIComponent } from '../api/dashboard-api.service';
import { DashboardFacadeComponent } from '../api/dashboard-facade';
import 'echarts-gl';

import * as echarts from 'echarts';

export interface HeatOptions {
  name: number;
  max: number;
  values: [];
}

export interface MarketWeeks {
  key: number;
  value: any[]
}


@Component({
  selector: 'dimensional-bar',
  templateUrl: './dimensional-bar-version.component.html',
  styleUrls: ['./dimensional-bar-version.component.scss']
})

export class DimensionalBarComponent {

  public myChart: any = null;

  public options: any = {};

  public heatmapData: HeatOptions[] = [];

  public chartTheme = 'dark';

  public yDays: any[] = [];

  public hoursArray: any[] = [];

  public days = ['Saturday', 'Friday', 'Thursday',
    'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

  public marketByWeeks: MarketWeeks[] = [];

  public targetElement: any;

  public widthObserver: any;

  public marketDataValues: any[] = [];

  public maxValueForVisualMap: number = 0;

  public allWeeks: any[] = [];

  data: any[][] = [];

  public kpiMetricCompare = [
    { id: 1, value: 'Count' },
    { id: 2, value: 'AvgFare' },
    { id: 3, value: 'Revenue' }];


  public myValueToggle = ['First'];


  @Input()
  public themeSelectInput: string;


  constructor(public dashboardTilesAPIComponent: DashboardTilesAPIComponent, private dashboardFacade: DashboardFacadeComponent, private host: ElementRef) {
    this.setupEventListeners();
  }



  private setupEventListeners() {

    // this.dashboardTilesAPIComponent.getMarketCsvData(this.dashboardTilesAPIComponent.Tiles_Heatmap)
    //   .subscribe((tilesHeatmap: any[]) => {
    //     //console.log(' MARKET Total ', tilesHeatmap)
    //   })



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
            //hourObject.push({ hour: m.Hour + 1, value: null })
          }

        })

        this.allWeeks = activeWeeks;

        const holder = this.returnWeeklyValues(activeWeeks);

        //console.log('this.heatmapData  holder ', this.hoursArray, ' activeWeeks ', activeWeeks, ' weeksCount ', weeksCount)

        this.heatmapData = holder.map((t: any, e: number) => {
          const test = this.returnDailyMetricValuesFlat(t)

          return { name: activeWeeks[e], max: test[1], values: test[0] }
        })


        //console.log('this.heatmapData  ', this.heatmapData, ' this.allWeeks  ', this.allWeeks)

        setTimeout(() => {
          this.createSvg();
        }, 1000);

      })
  }

  public returnWeeklyValues(marketWeek: any[]): any {

    console.log('marketWeek ', marketWeek, ' ', this.marketDataValues.length)

    let WeeklyCollection: any = [];

    let dataMap: any = {};

    marketWeek.forEach((f: any, i: number) => {
      dataMap = {};
      dataMap.name = marketWeek[i];
      dataMap.values = this.returnMetricValues(f)
      WeeklyCollection[i] = dataMap
    })

    //console.log('WeeklyCollection ', WeeklyCollection)
    return WeeklyCollection;
  }


  // Places values in Week Arrays
  public returnMetricValues(marketWeek: any): any {
    return this.marketDataValues.filter((m, x) => {
      if (marketWeek === m.Week) {
        return m
      }
    })
  }


  // Flattens Values into WeekDay by Week arrays
  public returnDailyMetricValuesFlat(marketWeek: any): any {

    console.log('marketWeek ', marketWeek, ' length ', this.marketDataValues.length)
    let newArray: any[] = [];
    let maxValues = [];

    marketWeek.values.forEach((m: any, x: number) => {

      for (let e = 0; e < this.yDays.length; e++) {
        //console.log(' x ', this.yDays[e])
        if (this.yDays[e] === m.WeekDay) {
          //console.log('m ', m.WeekDay, ' x ', x)
          newArray.push([m.Hour, m.WeekDay - 1, m.Revenue]);
        } else {
          //console.log('ELSE  m ', m, ' x ', x)
        }
      }

    })

    this.maxValueForVisualMap = Math.max(...[].concat(...newArray));
    maxValues.push(this.maxValueForVisualMap)
    return [newArray, ...maxValues];
  }



  public ngOnDestroy(): void {
    //this.widthObserver.unobserve(this.targetElement);
  }


  public createSvg() {

    const chart: HTMLCanvasElement = document.getElementById('dimensional-bar') as HTMLCanvasElement;
    this.myChart = echarts.init(chart);

    setTimeout(() => {
      this.setChart()
    }, 100);

  }


  public setChart() {
    const self = this;

    this.myChart.setOption(
      {
        notMerge: false,
        animation: true,
        animationDuration: 1000,
        tooltip: {},
        visualMap: {
          max: 20,
          inRange: {
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
          }
        },

        timeline: {
          currentIndex: 0,
          data: this.allWeeks,
          calculable: true,
          label: {
            formatter: function (s: any) {
              return String(s)
            }
          },
          autoPlay: true,
          playInterval: 3000,
          //replaceMerge: ['xAxis', 'series'],
        },
        // postEffect: {
        //   enable: true,
        //   focalDistance: 100,
        // },
        grid3D: {
          boxWidth: 200,
          boxDepth: 80,
          //boxHeight: 60,
          bottom: 370,
          top: 0,
          light: {
            main: {
              intensity: 1.2
            },
            ambient: {
              intensity: 0.3
            }
          }
        },
        xAxis3D: {
          type: 'category',
          data: this.hoursArray
        },
        zAxis3D: {
          type: 'value'
        },
        yAxis3D: {
          type: 'category',
          data: this.days,
          zAxis3D: {
            type: 'value'
          },

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
              max: 5000,
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
            series:
            {
              title: { 'text': 'Week 48' },
              name: this.heatmapData[0].name,
              type: 'bar3D',
              data: this.heatmapData[0].values.map(function (item) {
                //console.log('item ', item)
                return {
                  value: [item[0], item[1], item[2]]
                };
              }),
              shading: 'color',
              label: {
                show: false,
                fontSize: 16,
                borderWidth: 1
              },
              itemStyle: {
                opacity: 0.4
              },
              emphasis: {
                label: {
                  fontSize: 20,
                  color: '#900'
                },
                itemStyle: {
                  color: '#900'
                }
              }
            }
          }
        ]
      })
  }
}
