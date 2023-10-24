import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';


@Component({
  selector: 'monthly-flags-chart',
  templateUrl: './monthly-flags-chart.component.html',
  styleUrls: ['./monthly-flags-chart.component.scss']
})

export class MonthlyFlagsChartComponent implements OnInit {

  public options: any = {};
  public myChart: any = null;

  constructor() { }

  public ngOnInit(): void {
    this.createSvg();
  }

  // Sets up Dom node and attaches myChart element
  public createSvg(): void {

    // if (echarts.init(document.getElementById('priority-chart'))) {
    //   echarts.init(document.getElementById('priority-chart')).dispose();
    // }
    const chart: HTMLCanvasElement = document.getElementById('monthly-flags') as HTMLCanvasElement;
    this.myChart = echarts.init(chart, 'light');

    setTimeout(() => {
      this.setChartContents()
    }, 100);

  }


  public setChartContents() {

    let dataAxis = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let data = [42, 74, 39, 78, 72, 115, 32, 43, 72, 25, 60, 55];


    this.myChart.setOption({
      grid: {
        show: false,
        left: 25,
        right: 5,
        top: 45,
        bottom: 20
      },

      backgroundStyle: {
        color: 'transarent'
      },
      title: {
        text: 'Affected Flights by NDO',
        left: 0,
        top: 10,
        textStyle: {
          color: 'white',
          fontWeight: 'normal',
          fontSize: 14

        }
      },
      xAxis: {
        show: true,
        type: 'category',
        data: dataAxis,
        //interval: 1,
        axisLabel: {
          fontSize: 10,
          color: 'white'
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'white'
          }
        },
        z: 10
      },
      yAxis: {
        show: true,
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: 'white'
          }
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: true
        },
        axisLabel: {
          fontSize: 10,
          color: 'white'
        },
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [
        {
          type: 'bar',
          barWidth: 16,
          barGap: 1,
          label: {
            show: true,
            color: 'white',
            position: 'top',
          },
          showBackground: false,
          itemStyle: {
            // borderRadius: [5, 5, 0, 0],
            borderRadius: [7],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          },
          data: data
        }
      ]
    });
  }

}
