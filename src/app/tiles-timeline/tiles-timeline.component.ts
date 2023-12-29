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
  selector: 'app-tiles-timeline',
  templateUrl: './tiles-timeline.component.html',
  styleUrls: ['./tiles-timeline.component.scss'],

})

export class TilesTimelineComponent implements OnInit {

  public options: any = {};
  public myChart: any = null;
  public dataMap: any;

  // public x: number;
  // public y: number;
  // public z: number;

  constructor(public router: Router, public dashboardTilesAPIComponent: DashboardTilesAPIComponent) { }

  public ngOnInit(): void {


    this.createSvg();
  }


  // Sets up Dom node and attaches myChart element
  public createSvg(): void {

    // if (echarts.init(document.getElementById('timeline'))) {
    //   echarts.init(document.getElementById('timeline')).dispose();
    // }

    const chart: HTMLCanvasElement = document.getElementById('timeline-mapper') as HTMLCanvasElement;
    this.myChart = echarts.init(chart, 'light');

    setTimeout(() => {

      this.setChart()
    }, 10);

  }


  public setChart(): void {

    this.dataMap = {};

    function dataFormatter(obj: any) {
      var pList = [
        '1',
        '2',
        'Shanxi',
        'Inner Mongolia',
        'Liaoning',
        'Jilin',
        'Heilongjiang',
        'Shanghai',
        'Jiangsu',
        'Zhejiang',
        'Anhui',
        'Fujian',
        'Jiangxi',
        'Shandong',
        'Henan',
        'Hubei',
        'Hunan',
        'Guangdong',
        'Guangxi',
        'Hainan',
        'Chongqing',
        'Sichuan',
        'Guizhou',
        'Yunnan',
        'Tibet',
        'Shaanxi',
        'Gansu',
        'Qinghai',
        'Ningxia',
        'Xinjiang'
      ];
      var temp;
      for (var year = 2009; year <= 2011; year++) {
        var max = 0;
        var sum = 0;
        temp = obj[year];
        for (var i = 0, l = temp.length; i < l; i++) {
          max = Math.max(max, temp[i]);
          sum += temp[i];
          obj[year][i] = {
            name: pList[i],
            value: temp[i]
          };
        }
        obj[year + 'max'] = Math.floor(max / 100) * 100;
        obj[year + 'sum'] = sum;
      }
      return obj;
    }

    this.dataMap.dataGDP = dataFormatter({
      //max : 60000,
      2011: [
        16251.93, 11307.28, 24515.76, 11237.55, 14359.88, 22226.7, 10568.83, 12582,
        19195.69, 49110.27, 32318.85, 15300.65, 17560.18, 11702.82, 45361.85,
        26931.03, 19632.26, 19669.56, 53210.28, 11720.87, 2522.66, 10011.37,
        21026.68, 5701.84, 8893.12, 605.83, 12512.3, 5020.37, 1670.44, 2102.21,
        6610.05
      ],
      2010: [
        14113.58, 9224.46, 20394.26, 9200.86, 11672, 18457.27, 8667.58, 10368.6,
        17165.98, 41425.48, 27722.31, 12359.33, 14737.12, 9451.26, 39169.92,
        23092.36, 15967.61, 16037.96, 46013.06, 9569.85, 2064.5, 7925.58, 17185.48,
        4602.16, 7224.18, 507.46, 10123.48, 4120.75, 1350.43, 1689.65, 5437.47
      ],
      2009: [
        12153.03, 7521.85, 17235.48, 7358.31, 9740.25, 15212.49, 7278.75, 8587,
        15046.45, 34457.3, 22990.35, 10062.82, 12236.53, 7655.18, 33896.65,
        19480.46, 12961.1, 13059.69, 39482.56, 7759.16, 1654.21, 6530.01, 14151.28,
        3912.68, 6169.75, 441.36, 8169.8, 3387.56, 1081.27, 1353.31, 4277.05
      ],

    });

    this.dataMap.dataPI = dataFormatter({
      //max : 4000,
      2011: [
        136.27, 159.72, 2905.73, 641.42, 1306.3, 1915.57, 1277.44, 1701.5, 124.94,
        3064.78, 1583.04, 2015.31, 1612.24, 1391.07, 3973.85, 3512.24, 2569.3,
        2768.03, 2665.2, 2047.23, 659.23, 844.52, 2983.51, 726.22, 1411.01, 74.47,
        1220.9, 678.75, 155.08, 184.14, 1139.03
      ],
      2010: [
        124.36, 145.58, 2562.81, 554.48, 1095.28, 1631.08, 1050.15, 1302.9, 114.15,
        2540.1, 1360.56, 1729.02, 1363.67, 1206.98, 3588.28, 3258.09, 2147, 2325.5,
        2286.98, 1675.06, 539.83, 685.38, 2482.89, 625.03, 1108.38, 68.72, 988.45,
        599.28, 134.92, 159.29, 1078.63
      ],
      2009: [
        118.29, 128.85, 2207.34, 477.59, 929.6, 1414.9, 980.57, 1154.33, 113.82,
        2261.86, 1163.08, 1495.45, 1182.74, 1098.66, 3226.64, 2769.05, 1795.9,
        1969.69, 2010.27, 1458.49, 462.19, 606.8, 2240.61, 550.27, 1067.6, 63.88,
        789.64, 497.05, 107.4, 127.25, 759.74
      ],

    });

    this.dataMap.dataSI = dataFormatter({
      //max : 26600,
      2011: [
        3752.48, 5928.32, 13126.86, 6635.26, 8037.69, 12152.15, 5611.48, 5962.41,
        7927.89, 25203.28, 16555.58, 8309.38, 9069.2, 6390.55, 24017.11, 15427.08,
        9815.94, 9361.99, 26447.38, 5675.32, 714.5, 5543.04, 11029.13, 2194.33,
        3780.32, 208.79, 6935.59, 2377.83, 975.18, 1056.15, 3225.9
      ],
      2010: [
        3388.38, 4840.23, 10707.68, 5234, 6367.69, 9976.82, 4506.31, 5025.15,
        7218.32, 21753.93, 14297.93, 6436.62, 7522.83, 5122.88, 21238.49, 13226.38,
        7767.24, 7343.19, 23014.53, 4511.68, 571, 4359.12, 8672.18, 1800.06,
        3223.49, 163.92, 5446.1, 1984.97, 744.63, 827.91, 2592.15
      ],
      2009: [
        2855.55, 3987.84, 8959.83, 3993.8, 5114, 7906.34, 3541.92, 4060.72, 6001.78,
        18566.37, 11908.49, 4905.22, 6005.3, 3919.45, 18901.83, 11010.5, 6038.08,
        5687.19, 19419.7, 3381.54, 443.43, 3448.77, 6711.87, 1476.62, 2582.53,
        136.63, 4236.42, 1527.24, 575.33, 662.32, 1929.59
      ],

    });

    this.dataMap.dataTI = dataFormatter({
      //max : 25000,
      2011: [
        12363.18, 5219.24, 8483.17, 3960.87, 5015.89, 8158.98, 3679.91, 4918.09,
        11142.86, 20842.21, 14180.23, 4975.96, 6878.74, 3921.2, 17370.89, 7991.72,
        7247.02, 7539.54, 24097.7, 3998.33, 1148.93, 3623.81, 7014.04, 2781.29,
        3701.79, 322.57, 4355.81, 1963.79, 540.18, 861.92, 2245.12
      ],
      2010: [
        10600.84, 4238.65, 7123.77, 3412.38, 4209.03, 6849.37, 3111.12, 4040.55,
        9833.51, 17131.45, 12063.82, 4193.69, 5850.62, 3121.4, 14343.14, 6607.89,
        6053.37, 6369.27, 20711.55, 3383.11, 953.67, 2881.08, 6030.41, 2177.07,
        2892.31, 274.82, 3688.93, 1536.5, 470.88, 702.45, 1766.69
      ],
      2009: [
        9179.19, 3405.16, 6068.31, 2886.92, 3696.65, 5891.25, 2756.26, 3371.95,
        8930.85, 13629.07, 9918.78, 3662.15, 5048.49, 2637.07, 11768.18, 5700.91,
        5127.12, 5402.81, 18052.59, 2919.13, 748.59, 2474.44, 5198.8, 1885.79,
        2519.62, 240.85, 3143.74, 1363.27, 398.54, 563.74, 1587.72
      ],

    });

    this.dataMap.dataEstate = dataFormatter({
      //max : 3600,
      2011: [
        1074.93, 411.46, 918.02, 224.91, 384.76, 876.12, 238.61, 492.1, 1019.68,
        2747.89, 1677.13, 634.92, 911.16, 402.51, 1838.14, 987, 634.67, 518.04,
        3321.31, 465.68, 208.71, 396.28, 620.62, 160.3, 222.31, 17.44, 398.03,
        134.25, 29.05, 79.01, 176.22
      ],
      2010: [
        1006.52, 377.59, 697.79, 192, 309.25, 733.37, 212.32, 391.89, 1002.5,
        2600.95, 1618.17, 532.17, 679.03, 340.56, 1622.15, 773.23, 564.41, 464.21,
        2813.95, 405.79, 188.33, 266.38, 558.56, 139.64, 223.45, 14.54, 315.95,
        110.02, 25.41, 60.53, 143.44
      ],
      2009: [
        1062.47, 308.73, 612.4, 173.31, 286.65, 605.27, 200.14, 301.18, 1237.56,
        2025.39, 1316.84, 497.94, 656.61, 305.9, 1329.59, 622.98, 546.11, 400.11,
        2470.63, 348.98, 121.76, 229.09, 548.14, 136.15, 205.14, 13.28, 239.92,
        101.37, 23.05, 47.56, 115.23
      ],

    });

    this.dataMap.dataFinancial = dataFormatter({
      //max : 3200,
      2011: [
        2215.41, 756.5, 746.01, 519.32, 447.46, 755.57, 207.65, 370.78, 2277.4,
        2600.11, 2730.29, 503.85, 862.41, 357.44, 1640.41, 868.2, 674.57, 501.09,
        2916.13, 445.37, 105.24, 704.66, 868.15, 297.27, 456.23, 31.7, 432.11,
        145.05, 62.56, 134.18, 288.77
      ],
      2010: [
        1863.61, 572.99, 615.42, 448.3, 346.44, 639.27, 190.12, 304.59, 1950.96,
        2105.92, 2326.58, 396.17, 767.58, 241.49, 1361.45, 697.68, 561.27, 463.16,
        2658.76, 384.53, 78.12, 496.56, 654.7, 231.51, 375.08, 27.08, 384.75,
        100.54, 54.53, 97.87, 225.2
      ],
      2009: [
        1603.63, 461.2, 525.67, 361.64, 291.1, 560.2, 180.83, 227.54, 1804.28,
        1596.98, 1899.33, 359.6, 612.2, 165.1, 1044.9, 499.92, 479.11, 402.57,
        2283.29, 336.82, 65.73, 389.97, 524.63, 194.44, 351.74, 23.17, 336.21,
        88.27, 45.63, 75.54, 198.87
      ],

    });


    console.log('this.options ', this.dataMap.dataFinancial)

    this.options = {
      baseOption: {
        timeline: {
          axisType: 'category',
          // realtime: false,
          // loop: false,
          autoPlay: true,

          left: 20,
          //top: 0,
          right: 20,
          bottom: 0,
          // currentIndex: 2,
          playInterval: 1000,
          // controlStyle: {
          //     position: 'left'
          // },
          data: [
            '2009-01-01',
            '2010-01-01',
            '2011-01-01',
          ],
          label: {
            formatter: function (s: any) {
              return new Date(s).getFullYear();
            }
          }
        },
        title: {
          show: true,
          subtext: 'Flag Runs'
        },
        tooltip: {},
        legend: {
          left: 'right',
          data: ['Primary Industry', 'Secondary Industry', 'Tertiary Industry']
        },
        calculable: true,
        grid: {
          top: 120,
          bottom: 90
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: { interval: 0 },
            data: [
              'Beijing',
              '\nTianjin',
              'Hebei',
              '\nShanxi',
              'Inner Mongolia',
              '\nLiaoning',
              'Jilin',
              '\nHeilongjiang',
              'Shanghai',
              '\nJiangsu',
              'Zhejiang',
              '\nAnhui',
              'Fujian',
              '\nJiangxi',
              'Shandong',
              '\nHenan',
              'Hubei',
              '\nHunan',
              'Guangdong',
              '\nGuangxi',
              'Hainan',
              '\nChongqing',
              'Sichuan',
              '\nGuizhou',
              'Yunnan',
              '\nTibet',
              'Shaanxi',
              '\nGansu',
              'Qinghai',
              '\nNingxia',
              'Xinjiang'
            ],
            splitLine: { show: false }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'GDP (Billions）',
            // max: 53500
            max: 30000
          }
        ],
        series: [
          { name: 'GDP', type: 'bar' },
          { name: 'Finance', type: 'bar' },
          { name: 'Real Estate', type: 'bar' },
          { name: 'Primary Industry', type: 'bar' },
          { name: 'Secondary industry', type: 'bar' },
          { name: 'Tertiary industry', type: 'bar' },
          // {
          //   name: 'GDP Proportion',
          //   type: 'pie',
          //   center: ['75%', '35%'],
          //   radius: '18%'
          // },

        ]
      },
      options: [
        {
          title: { text: '2009 Affected Flights' },
          series: [
            { data: this.dataMap.dataGDP['2009'] },
            { data: this.dataMap.dataFinancial['2009'] },
            { data: this.dataMap.dataEstate['2009'] },
            { data: this.dataMap.dataPI['2009'] },
            { data: this.dataMap.dataSI['2009'] },
            { data: this.dataMap.dataTI['2009'] },
            // {
            //   data: [
            //     { name: 'Primary Industry', value: this.dataMap.dataPI['2009sum'] },
            //     { name: 'Secondary Industry', value: this.dataMap.dataSI['2009sum'] },
            //     { name: 'Tertiary Industry', value: this.dataMap.dataTI['2009sum'] }
            //   ]
            // }
          ]
        },
        {
          title: { text: '2010 Affected Flights' },
          series: [
            { data: this.dataMap.dataGDP['2010'] },
            { data: this.dataMap.dataFinancial['2010'] },
            { data: this.dataMap.dataEstate['2010'] },
            { data: this.dataMap.dataPI['2010'] },
            { data: this.dataMap.dataSI['2010'] },
            { data: this.dataMap.dataTI['2010'] },
            // {
            //   data: [
            //     { name: 'Primary Industry', value: this.dataMap.dataPI['2010sum'] },
            //     { name: 'Secondary Industry', value: this.dataMap.dataSI['2010sum'] },
            //     { name: 'Tertiary Industry', value: this.dataMap.dataTI['2010sum'] }
            //   ]
            // }
          ]
        },
        {
          title: { text: '2011 Affected Flights' },
          series: [
            { data: this.dataMap.dataGDP['2011'] },
            { data: this.dataMap.dataFinancial['2011'] },
            { data: this.dataMap.dataEstate['2011'] },
            { data: this.dataMap.dataPI['2011'] },
            { data: this.dataMap.dataSI['2011'] },
            { data: this.dataMap.dataTI['2011'] },
            // {
            //   data: [
            //     { name: 'Primary Industry', value: this.dataMap.dataPI['2011sum'] },
            //     { name: 'Secondary Industry', value: this.dataMap.dataSI['2011sum'] },
            //     { name: 'Tertiary Industry', value: this.dataMap.dataTI['2011sum'] }
            //   ]
            // }
          ]
        }
      ]
    };

    this.options && this.myChart.setOption(this.options);

  }

}
