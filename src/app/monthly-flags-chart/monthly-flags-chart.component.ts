import { Component, HostListener, OnInit } from '@angular/core';
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


  constructor(public dashboardTilesAPIComponent: DashboardTilesAPIComponent) {

    this.dashboardTilesAPIComponent.apiFlagChartData$
      .subscribe((values: any) => {
        if (values) {
          //console.log('apiFlagChartData$ ', values)
          //this.dashboardTilesAPIComponent.apiPrioritiesSubject$.next(values.priorityData);
          //this.dashboardTilesAPIComponent.apiFlightsByNdoSubject$.next(values.ndoData)
        }
      })

    this.dashboardTilesAPIComponent.apiFlightsByNdoSubject$.subscribe((res: any) => {

      let arry: any = [];
      let totalCount: any = [];
      let ndoCount = 0;
      let preIncrement = 1;
      let iIncrement = 1;

      if (res.length > 0) {

        this.NdoData = res;

        res.forEach((r: any, i: number) => {
          if (i === 0) {
            //iIncrement = 1
          } else if (r.value % 10 !== 0) {
            iIncrement = r.value;
            ndoCount += r.count;
          } else {
            //console.log('preIncrement ', preIncrement, ' iIncrement ', iIncrement)
            totalCount.push({ Range: `${preIncrement} to ${iIncrement}`, Count: ndoCount })
            preIncrement = r.value
            ndoCount = 0
          }

        })
        this.NdoData = totalCount
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // console.log('event ', event.currentTarget.innerHeight, ' innerWidth ', window.innerHeight)
    if (this.myChart) {
      this.myChart.resize();
    }
  }


  public setChartContents() {

    let axisData = [...this.NdoData];


    this.myChart.setOption({
      responsive: true,
      maintainAspectRatio: false,
      grid: {
        show: false,
        height: 'auto',
        left: 40,
        right: 65,
        top: 55,
        bottom: 40
      },
      title: {
        left: 20,
        top: 10,
        show: true,
        text: 'Affected Flights',
        textStyle: {
          color: 'white',
          fontWeight: 'normal',
          fontSize: 14
        }
      },
      backgroundStyle: {
        color: 'transparent'
      },

      xAxis: {
        show: true,
        type: 'category',
        name: 'NDO',
        nameLocation: 'end',
        nameGap: 10,
        nameTextStyle: {
          lineHeight: -10,
          verticalAlign: 'bottom',
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
          barMaxWidth: 30,
          barGap: 2,
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
