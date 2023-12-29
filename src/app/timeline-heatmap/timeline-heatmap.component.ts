import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import * as echarts from 'echarts';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { DashboardTilesAPIComponent } from 'src/app/api/dashboard-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tiles-heatmap',
  templateUrl: './timeline-heatmap.component.html',
  styleUrls: ['./timeline-heatmap.component.scss'],

})

export class HeatmapTimelineComponent implements OnInit {

  public options: any = {};
  public myChart: any = null;
  public dataMap: any;

  public xData: any = [];
  public yData: any = [];

  public data: any = [];
  public data2: any = [];
  public data3: any = [];
  // public x: number;
  // public y: number;
  // public z: number;

  constructor(public router: Router, public dashboardTilesAPIComponent: DashboardTilesAPIComponent) {

    this.data = this.generateData(2, -5, 5);
    this.data2 = this.generateData(2, -5, 5);
    //  this.data3 = this.generateData(2, -5, 7);

    // console.log('data ', this.data)
    // console.log('data 2 ', this.data2)
    //console.log('data 3 ', this.data3)
  }

  public ngOnInit(): void {
    this.createSvg();
  }

  public generateData(theta: number, min: number, max: number) {

    let noise = this.getNoiseHelper();
    let xData: any = [];
    let yData: any = [];
    noise.seed(Math.random());

    let data = [];
    for (let i = 0; i <= 20; i++) {
      for (let j = 0; j <= 20; j++) {
        // let x = (max - min) * i / 200 + min;
        // let y = (max - min) * j / 100 + min;
        data.push([i, j, noise.perlin2(i / 20, j / 20) + 0.5]);
        // data.push([i, j, normalDist(theta, x) * normalDist(theta, y)]);

      }
      xData.push(i);
    }
    for (let j = 0; j < 100; j++) {
      yData.push(j);
    }
    // @ts-ignore
    this.xData = xData
    // @ts-ignore
    this.yData = yData
    return data;
  }
  ///////////////////////////////////////////////////////////////////////////
  // perlin noise helper from https://github.com/josephg/noisejs
  ///////////////////////////////////////////////////////////////////////////

  public getNoiseHelper() {

    class Grad {
      x: number;
      y: number;
      z: number;
      constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
      }

      dot2(x: number, y: number) {
        return this.x * x + this.y * y;
      }
      dot3(x: number, y: number, z: number) {
        return this.x * x + this.y * y + this.z * z;
      }
    }
    const grad3 = [
      new Grad(1, 1, 0),
      new Grad(-1, 1, 0),
      new Grad(1, -1, 0),
      new Grad(-1, -1, 0),
      new Grad(1, 0, 1),
      new Grad(-1, 0, 1),
      new Grad(1, 0, -1),
      new Grad(-1, 0, -1),
      new Grad(0, 1, 1),
      new Grad(0, -1, 1),
      new Grad(0, 1, -1),
      new Grad(0, -1, -1)
    ];
    const p: number[] = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
      36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120,
      234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
      88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71,
      134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133,
      230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161,
      1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130,
      116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250,
      124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227,
      47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44,
      154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98,
      108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34,
      242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14,
      239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121,
      50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243,
      141, 128, 195, 78, 66, 215, 61, 156, 180
    ];
    // To remove the need for index wrapping, double the permutation table length
    let perm = new Array(512);
    let gradP = new Array(512);
    // This isn't a very good seeding function, but it works ok. It supports 2^16
    // different seed values. Write something better if you need more seeds.
    function seed(seed: number) {
      if (seed > 0 && seed < 1) {
        // Scale the seed out
        seed *= 65536;
      }
      seed = Math.floor(seed);
      if (seed < 256) {
        seed |= seed << 8;
      }
      for (let i = 0; i < 256; i++) {
        let v;
        if (i & 1) {
          v = p[i] ^ (seed & 255);
        } else {
          v = p[i] ^ ((seed >> 8) & 255);
        }
        perm[i] = perm[i + 256] = v;
        gradP[i] = gradP[i + 256] = grad3[v % 12];
      }
    }
    seed(0);
    // ##### Perlin noise stuff
    function fade(t: number) {
      return t * t * t * (t * (t * 6 - 15) + 10);
    }
    function lerp(a: number, b: number, t: number) {
      return (1 - t) * a + t * b;
    }
    // 2D Perlin Noise
    function perlin2(x: number, y: number) {
      // Find unit grid cell containing point
      let X = Math.floor(x),
        Y = Math.floor(y);
      // Get relative xy coordinates of point within that cell
      x = x - X;
      y = y - Y;
      // Wrap the integer cells at 255 (smaller integer period can be introduced here)
      X = X & 255;
      Y = Y & 255;
      // Calculate noise contributions from each of the four corners
      let n00 = gradP[X + perm[Y]].dot2(x, y);
      let n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
      let n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
      let n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);
      // Compute the fade curve value for x
      let u = fade(x);
      // Interpolate the four results
      return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y));
    }
    return {
      seed,
      perlin2
    };
  }

  // Sets up Dom node and attaches myChart element
  public createSvg(): void {

    // if (echarts.init(document.getElementById('timeline'))) {
    //   echarts.init(document.getElementById('timeline')).dispose();
    // }

    const chart: HTMLCanvasElement = document.getElementById('timeline-heatmap') as HTMLCanvasElement;
    this.myChart = echarts.init(chart);

    setTimeout(() => {
      this.setChart()
    }, 100);

  }


  public setChart(): void {

    this.options = {

      baseOption: {
        timeline: {
          axisType: 'category',
          realtime: false,
          // loop: false,
          autoPlay: true,

          left: 40,
          //top: 0,
          right: 20,
          bottom: 0,
          currentIndex: 0,
          playInterval: 3000,
          // controlStyle: {
          //     position: 'left'
          // },
          data: [
            '2012-01-01',
            '2013-01-01',
            '2014-01-01',
            '2015-01-01',
            '2016-01-01',
            '2017-01-01',
            '2018-01-01',
            '2019-01-01',
            '2020-01-01',
            '2021-01-01',
            '2022-01-01'
          ],
          label: {
            formatter: function (s: any) {
              // console.log('s ', s)
              return new Date(s).getFullYear();
              //return s
            }
          }
        },
        // title: {
        //   show: true,
        //   subtext: 'Flag Runs'
        // },
        tooltip: {},
        legend: {
          show: false,
          left: 'right',
          data: ['Primary Industry', 'Secondary Industry', 'Tertiary Industry'],
          selected: {
            GDP: false,
            Finance: false,
            RealEstate: false
          }
        },
        calculable: true,
        // grid: {
        //   top: 30,
        //   bottom: 120
        // },
        xAxis: [
          {
            type: 'category',
            axisLabel: { interval: 5 },
            data: [
              '1 - 10',
              '11 - 30',
              '31 - 50',
              '51 - 80',
              '81 - 100',
              '101 - 120'
            ],

            splitLine: { show: true }
          }
        ],
        replaceMerge: 'NORMAL_MERGE',
        yAxis: [
          {
            type: 'category',
            name: 'NDO',
            // max: 53500
            // max: 30000
          }
        ],
        //series: [
        //{ name: '1 - 10', type: 'heatmap', data: this.data },
        // { name: '11 - 30', type: 'heatmap', data: this.data2 },
        // { name: '31 - 50', type: 'heatmap', data: this.data3 },
        // { name: '51 - 80', type: 'heatmap', data: this.data },
        // { name: '81 - 100', type: 'heatmap', data: this.data2 },
        // { name: '101 - 120', type: 'heatmap', data: this.data3 }
        //]
      },

      options: [
        {
          tooltip: {},
          grid: {
            right: 30,
            top: 50,
            left: 65,
            bottom: 80
          },
          xAxis: {
            type: 'category',
            data: this.xData,
            minInterval: 10000,
          },
          yAxis: {
            type: 'category',
            data: this.yData
          },
          visualMap: {
            min: 0,
            max: 1,
            top: '30%',
            orient: 'vertical',
            left: 1,
            calculable: true,
            realtime: false,
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
          series: [
            {
              id: 1,
              name: 'Gaussian1',
              type: 'heatmap',
              universalTransition: true,
              data: this.data,
              emphasis: {
                itemStyle: {
                  borderColor: '#333',
                  borderWidth: 1
                }
              },
              progressive: 16000,
              animation: false,
              //animationDuration: 1500
            },
            {
              blur: true,
              name: 'Gaussian1',
              universalTransition: true,
              type: 'heatmap',
              data: this.data2,
              emphasis: {
                itemStyle: {
                  borderColor: '#333',
                  borderWidth: 1
                }
              },
              progressive: 16000,
              animation: false,
              //animationDuration: 1400
            },
            // {
            //   name: 'Gaussian',
            //   type: 'heatmap',
            //   data: this.data3,
            //   emphasis: {
            //     itemStyle: {
            //       borderColor: '#333',
            //       borderWidth: 1
            //     }
            //   },
            //   progressive: 10000,
            //   animation: false
            // },
            // {
            //   name: 'Gaussian',
            //   type: 'heatmap',
            //   data: this.data,
            //   emphasis: {
            //     itemStyle: {
            //       borderColor: '#333',
            //       borderWidth: 1
            //     }
            //   },
            //   progressive: 10000,
            //   animation: false
            // },
            // {
            //   name: 'Gaussian',
            //   type: 'heatmap',
            //   data: this.data2,
            //   emphasis: {
            //     itemStyle: {
            //       borderColor: '#333',
            //       borderWidth: 1
            //     }
            //   },
            //   progressive: 10000,
            //   animation: false
            // },
            // {
            //   name: 'Gaussian',
            //   type: 'heatmap',
            //   data: this.data3,
            //   emphasis: {
            //     itemStyle: {
            //       borderColor: '#333',
            //       borderWidth: 1
            //     }
            //   },
            //   progressive: 10000,
            //   animation: false
            // },
          ]
        }
      ]
    }
    this.options && this.myChart.setOption(this.options, {
      notMerge: false,
    });
  };

}
