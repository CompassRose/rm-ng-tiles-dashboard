import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { blueRamp16 } from '../dashboard-constants';
import { MockService } from '../services/tiles-mock-api';

@Component({
  selector: 'app-priority-chart',
  templateUrl: './priority-chart.component.html',
  styleUrls: ['./priority-chart.component.scss']
})

export class PriorityChartComponent {

  public options: any = {};
  public myChart: any = null;
  public priorityPercent: number;
  public priorityValues: number[] = [];

  // public legendData = [
  //   'Very Urgent',
  //   'Urgent',
  //   'Medium Urgency',
  //   'Low Urgency',
  //   'All in order'
  // ]

  // public chartValues = [
  //   { value: 42, name: 'Very Urgent', percent: '42%' },
  //   { value: 7, name: 'Urgent', percent: '7%' },
  //   { value: 6, name: 'Medium Urgency', percent: '6%' },
  //   { value: 12, name: 'Low Urgency', percent: '12%' },
  //   { value: 33, name: 'All in order', percent: '33%' }
  // ]

  public blueRamp = blueRamp16

  constructor(public mockTileService: MockService) {
    let totalCount = 0;
    this.mockTileService.apiPrioritiesSubject$.subscribe((res: any) => {

      if (res.length > 0) {

        this.priorityValues = res[0].PriorityData;

        res[0].PriorityData.forEach((priorValue: any) => {
          totalCount += priorValue.Count
        })
        this.priorityPercent = totalCount

        this.createSvg()
      }
    })
  }

  // Sets up Dom node and attaches myChart element
  public createSvg(): void {

    // if (echarts.init(document.getElementById('priority-chart'))) {
    //   echarts.init(document.getElementById('priority-chart')).dispose();
    // }
    const chart: HTMLCanvasElement = document.getElementById('priority-chart') as HTMLCanvasElement;
    this.myChart = echarts.init(chart, 'light');

    setTimeout(() => {
      this.setChartContents()
    }, 100);

  }


  public setChartContents() {

    // console.log('setChartContents ', this.myChart)

    this.myChart.setOption({

      // title: {
      //   text: 'Priority Status',
      //   left: 10,
      //   top: 10,
      //   textStyle: {
      //     color: 'white',
      //     fontWeight: 'normal',
      //     fontSize: 14

      //   }
      //   // subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
      // },
      grid: {
        //show: false,
        left: 0,
        right: 45,
        top: 5,
        bottom: 20
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        show: true,
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
          const percentValue = +((item.Count / this.priorityPercent) * 100).toFixed(2);
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
              value: values.Priority,
              name: values.Count,
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
