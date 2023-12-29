import { Component, OnInit, HostListener } from '@angular/core';
import * as echarts from 'echarts';
import { formatRgb, formatHsl, converter, formatHex, samples, filterSepia, interpolate, interpolatorSplineBasis } from 'culori';
import { DashboardTilesAPIComponent } from '../api/dashboard-api.service';
const culori: any = require('culori')

@Component({
  selector: 'app-priority-chart',
  templateUrl: './priority-chart.component.html',
  styleUrls: ['./priority-chart.component.scss']
})

export class PriorityChartComponent implements OnInit {

  public options: any = {};
  public myChart: any = null;
  public priorityPercent: number;
  public priorityValues: number[] = [];

  public legendData = [
    'Very Urgent',
    'Urgent',
    'Medium Urgency',
    'Low Urgency',
    'All in order'
  ]


  public blueRamp: any;

  public blueRampRange: string[] = ['#313194', '#c4d2ff'];

  constructor(public dashboardTilesAPIComponent: DashboardTilesAPIComponent) {

    let totalCount = 0;

    dashboardTilesAPIComponent.apiPrioritiesSubject$.subscribe((res: any) => {
      if (res.length > 0) {
        this.priorityValues = res;
        //console.log('response $ ', this.priorityValues)
        this.priorityValues.forEach((priorValue: any) => {
          totalCount += priorValue.count
        })

        //console.log('totalCount', totalCount)
        this.priorityPercent = totalCount
        this.blueRamp = this.generateRamps(this.priorityValues.length, this.blueRampRange);

        this.setChartContents()

      }
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this.myChart) {
      this.myChart.resize();
    }
  }


  public ngOnInit(): void {
    this.createSvg();
  }


  // generates color ramp for length of priority array // culori samples
  public generateRamps(numClasses: number, colorRange: any): any {
    return samples(numClasses)
      .map(interpolate(colorRange))
      //.map(filterSepia(1))
      .map(formatHex);
  }



  // Sets up Dom node and attaches myChart element
  public createSvg(): void {

    // if (echarts.init(document.getElementById('priority-chart'))) {
    //   echarts.init(document.getElementById('priority-chart')).dispose();
    // }
    const chart: HTMLCanvasElement = document.getElementById('priority-chart') as HTMLCanvasElement;
    this.myChart = echarts.init(chart, 'light');

  }


  public setChartContents() {

    if (this.myChart) {

      this.myChart.setOption({

        title: {
          text: 'Priority Status',
          left: 10,
          top: 10,
          textStyle: {
            color: 'white',
            fontWeight: 'normal',
            fontSize: 14
          }
        },
        grid: {
          //show: false,
          left: 0,
          right: 65,
          top: 5,
          bottom: 20
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          show: false,
          top: '10%',
          right: 50,
          align: 'right',
          orient: 'vertical',
          icon: 'circle',
          itemHeight: 20,
          itemWidth: 10,
          itemGap: 15,
          textStyle: {
            color: 'white',
            fontSize: 11,
          },

          formatter: this.priorityValues.map((item: any, i) => {
            //console.log('formatter ', item, ' priorityPercent ', this.priorityPercent)
            const percentValue = +((item.count / this.priorityPercent) * 100).toFixed(2);
            const percentStr = `${percentValue} %`
            const percentVal = {
              name: percentStr,
              icon: 'circle',
            }
            return percentVal
          }),
        },
        series: [
          {
            name: 'Urgency',
            type: 'pie',
            radius: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
              rotate: 0,
              show: true,
              //overflow: 'truncate',
              //position: 'outer',
              //alignTo: 'none',
              color: 'white',
              //edgeDistance: '25%',
              //bleedMargin: 0,
              distanceToLabelLine: 0
            },

            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: 40,
            //     fontWeight: 'bold'
            //   }
            // },
            labelLine: {
              show: true
            },
            data: this.priorityValues.map((values: any, i) => {
              return {
                value: values.count,
                name: values.value,
                itemStyle: {
                  color: this.blueRamp[i]
                },
                textStyle: {
                  color: 'white'
                }
              }
            })
          }
        ]
      });
    }
  }
}
