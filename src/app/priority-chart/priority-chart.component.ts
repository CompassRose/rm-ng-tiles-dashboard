import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { blueRamp16 } from '../dashboard-constants';

@Component({
  selector: 'app-priority-chart',
  templateUrl: './priority-chart.component.html',
  styleUrls: ['./priority-chart.component.scss']
})

export class PriorityChartComponent implements OnInit {

  public options: any = {};
  public myChart: any = null;

  public legendData = [
    'Very Urgent',
    'Urgent',
    'Medium Urgency',
    'Low Urgency',
    'All in order'
  ]

  public chartValues = [
    { value: 42, name: 'Very Urgent', percent: '42%' },
    { value: 7, name: 'Urgent', percent: '7%' },
    { value: 6, name: 'Medium Urgency', percent: '6%' },
    { value: 12, name: 'Low Urgency', percent: '12%' },
    { value: 33, name: 'All in order', percent: '33%' }
  ]
  public blueRamp = blueRamp16

  constructor() { }

  public ngOnInit(): void {
    this.createSvg()
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

    console.log('setChartContents ', this.myChart)

    this.myChart.setOption({
      title: {
        text: 'Priority status',
        left: 0,
        top: 10,
        textStyle: {
          color: 'white',
          fontWeight: 'normal',
          fontSize: 14

        }
        // subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
      },
      grid: {
        show: false,
        //left: 5,
        right: 45,
        top: 25,
        bottom: 30
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        show: true,
        top: '20%',
        right: 0,
        align: 'right',
        orient: 'vertical',
        icon: 'circle',
        itemHeight: 20,
        itemWidth: 20,
        itemGap: 10,
        textStyle: {
          color: 'white'
        },
        //data: this.legendData,
        formatter: this.legendData.map((item, i) => {
          console.log('item ', item)
          const test = {
            name: item,
            icon: 'circle',
          }
          return test
        }),
      },
      series: [
        {
          name: 'Urgency',
          type: 'pie',
          radius: ['45%', '70%'],
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
          data: this.chartValues.map((values, i) => {
            return {
              value: values.value,
              name: values.percent,
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
