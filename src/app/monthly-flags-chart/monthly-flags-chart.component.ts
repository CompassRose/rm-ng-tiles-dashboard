import { Component, OnInit } from '@angular/core';
import { MockService } from '../services/tiles-mock-api';
import * as echarts from 'echarts';
import { NdoValuesModel } from '../models/tiles.model';
import { DashboardTilesAPIComponent } from '../api/dashboard-api.service';



@Component({
  selector: 'monthly-flags-chart',
  templateUrl: './monthly-flags-chart.component.html',
  styleUrls: ['./monthly-flags-chart.component.scss']
})

export class MonthlyFlagsChartComponent implements OnInit {

  public options: any = {};
  public myChart: any = null;
  public NdoData: NdoValuesModel[] = [];

  constructor(public mockTileService: MockService, public dashboardTilesAPIComponent: DashboardTilesAPIComponent) {

    this.dashboardTilesAPIComponent.apiFlagChartData$
      .subscribe((values: any) => {
        if (values) {
          console.log('apiFlagChartData$ ', values)
        }

      })

    this.mockTileService.apiPrioritiesSubject$.subscribe((res: any) => {
      if (res.length > 0) {
        this.NdoData = res[0].NDOData;
        this.createSvg();
      }
    })
  }

  public ngOnInit(): void { }

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

    let axisData = [...this.NdoData];


    this.myChart.setOption({
      grid: {
        show: false,
        left: 40,
        right: 25,
        top: 35,
        bottom: 60
      },

      backgroundStyle: {
        color: 'transarent'
      },

      xAxis: {
        show: true,
        type: 'category',
        name: 'NDO Range',
        nameLocation: 'middle',
        nameGap: 25,
        nameTextStyle: {
          fontSize: 10,
          color: 'rgba(230,230,230,1)'
        },
        axisLabel: {
          fontSize: 10,
          color: 'rgba(230,230,230,1)'
        },
        axisTick: {
          show: true
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(230,230,230,1)'
          }
        },
        data: axisData.map((nd: any, i: number) => {
          return nd.Range
        }),
        z: 10
      },
      yAxis: {
        show: true,
        type: 'value',
        name: 'Flight Count',
        nameLocation: 'middle',
        nameGap: 25,
        nameTextStyle: {
          fontSize: 10,
          color: 'rgba(230,230,230,1)'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(230,230,230,1)'
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
          color: 'rgba(230,230,230,1)'
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
          barWidth: 30,
          barGap: 0,
          label: {
            show: true,
            color: 'white',
            position: 'top',
          },
          showBackground: false,
          itemStyle: {
            // borderRadius: [5, 5, 0, 0],
            borderRadius: [5],
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
          data: this.NdoData.map((nd: any, i: number) => {
            //   console.log('nd ', nd)
            return nd.Count
          })
        }
      ]
    });
  }

}
