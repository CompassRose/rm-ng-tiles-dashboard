
import { Injectable, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { PathToAssets } from '../dashboard-constants';

import { GridsterConfig, GridsterItem } from 'angular-gridster2';

import * as moment from 'moment';



@Injectable({
    providedIn: 'root',
})




export class SortTileOptionsService {

    public dashboard: any = [];

    public isNdoChecked = true;

    public isThemeChange = true;

    public chartThemeSelect = 'dark';

    public selectedItems: any[] = [];

    public priorityItems: any[] = [];

    public selectedPriority: number = 0;

    public routeListBehaviorSubject$ = new BehaviorSubject<any[]>([]);

    public priorityListBehaviorSubject$ = new BehaviorSubject<any[]>([]);

    public routeList: any[] = [];

    public analystGroup = [
        {
            idx: 0,
            name: "Guy Hawkins",
            title: 'Senior Analyst',
            state: true,
            avatar: '../assets/images/img-6525-8-01.png'
        },
        {
            idx: 1,
            name: "Franklin Webb",
            title: 'Junior Analyst',
            state: false,
            avatar: '../assets/images/img-6525-8-02.png'
        },
        {
            idx: 2,
            name: "John Anderson",
            title: 'Junior Analyst',
            state: false,
            avatar: '../assets/images/img-6525-8-03.png'
        },
        {
            idx: 3,
            name: "Willie Smish",
            title: 'Senior Analyst',
            state: true,
            avatar: '../assets/images/img-6525-8-04.png'
        },
        {
            idx: 4,
            name: "Peter Johnson",
            title: 'Senior Analyst',
            state: false,
            avatar: '../assets/images/img-6525-8-03.png'
        },
        {
            idx: 5,
            name: "Guy Hawkins",
            title: 'Senior Analyst',
            state: false,
            avatar: '../assets/images/img-6525-8-01.png'
        },
        {
            idx: 6,
            name: "Franklin Webb",
            title: 'Junior Analyst',
            state: true,
            avatar: '../assets/images/img-6525-8-01.png'
        },
        {
            idx: 7,
            name: "John Anderson",
            title: 'Junior Analyst',
            state: false,
            avatar: '../assets/images/img-6525-8-02.png'
        },
        {
            idx: 8,
            name: "Willie Smish",
            title: 'Senior Analyst',
            state: false,
            avatar: '../assets/images/img-6525-8-02.png'
        },
        {
            idx: 9,
            name: "Peter Johnson",
            title: 'Senior Analyst',
            state: false,
            avatar: '../assets/images/analyst05.png'
        },
    ]

    public selectedAnalysts: any = []


    constructor() {

        let momentOne = moment(new Date(2023, 2, 12, 5, 0, 0));

        let firstDay = momentOne.format('M/DD/YYYY: H');

        let duration = moment.duration({ 'days': 4, 'hours': 1, 'minutes': 15 });

        let addedDay = momentOne.add(duration);

        let addADay = addedDay.format('M/DD/YYYY: H');

        addedDay.format('M/DD/YYYY');
        // addedDay.format('M/DD/YYYY');

        console.log('firstDay ', firstDay, ' addedDay ', addADay)

        this.dashboard = [
            { idx: 0, color: 'Brown', name: 'Title', priority: 1, reviewed: true, lastUpdate: '20th-July-2023' },
            { idx: 1, color: 'navy', name: 'Title', priority: 1, reviewed: true, lastUpdate: '20th-May-2023' },
            { idx: 2, color: 'DarkGreen', name: 'Title', priority: 1, reviewed: true, lastUpdate: '20th-May-2023' },
            { idx: 3, color: 'DarkBlue', name: 'Title', priority: 1, reviewed: true, lastUpdate: '20th-May-2023' },
            { idx: 4, color: 'Brown', name: 'Title', priority: 2, reviewed: false, lastUpdate: '20th-May-2023' },
            { idx: 5, color: 'DarkGreen', name: 'Title', priority: 2, reviewed: true, lastUpdate: '20th-May-2023' },
            { idx: 6, color: 'DarkSlateGrey', name: 'Title', priority: 2, reviewed: true, lastUpdate: '20th-May-2023' },
            { idx: 7, color: 'DarkRed', name: 'Title', priority: 2, reviewed: false, lastUpdate: '20th-May-2023' },
            { idx: 8, color: 'purple', name: 'Title', priority: 3, reviewed: true, lastUpdate: '20th-May-2023' },
            { idx: 9, color: 'DarkGreen', name: 'Title', priority: 3, reviewed: false, lastUpdate: '20th-May-2023' },
            { idx: 10, color: 'DarkSlateGrey', name: 'Title', priority: 3, reviewed: false, lastUpdate: '20th-May-2023' },
            { idx: 11, color: 'navy', name: 'Title', priority: 3, reviewed: false, lastUpdate: '20th-May-2023' },
            { idx: 12, color: 'Indigo', name: 'Title', priority: 4, reviewed: true, lastUpdate: '20th-May-2023' },
            { idx: 13, color: 'DarkBlue', name: 'Title', priority: 4, reviewed: false, lastUpdate: '20th-May-2023' },
            { idx: 14, color: 'Brown', name: 'Title', priority: 2, reviewed: false, lastUpdate: '20th-May-2023' },
            { idx: 15, color: 'DarkGreen', name: 'Title', priority: 1, reviewed: true, lastUpdate: '20th-May-2023' },
            { idx: 16, color: 'DarkBlue', name: 'Title', priority: 1, reviewed: true, lastUpdate: '20th-May-2023' },
            { idx: 17, color: 'Brown', name: 'Title', priority: 2, reviewed: false, lastUpdate: '20th-May-2023' },
            { idx: 18, color: 'DarkGreen', name: 'Title', priority: 2, reviewed: true, lastUpdate: '20th-May-2023' },
            { idx: 19, color: 'DarkSlateGrey', name: 'Title', priority: 2, reviewed: true, lastUpdate: '20th-May-2023' },
        ];

        this.dashboard.map((db: any, i: number) => {
            db.lastUpdate = momentOne.add(duration).format('h:mm - MMM-DD-YYYY');
            console.log('???? ', db.lastUpdate)
            return db;
        })

        this.priorityItems = [
            { id: 0, name: 'Priority', metric: 'priority' },
            { id: 1, name: 'Last Run', metric: 'lastUpdate' },
            { id: 2, name: 'Reviewed', metric: 'reviewed' }
        ];

        this.selectedPriority = this.priorityItems[0];

        this.routeList = [
            { id: 1, name: 'LGN - PMI', state: true },
            { id: 2, name: 'LTN - PMI', state: false },
            { id: 3, name: 'LGW - PMI', state: false },
            { id: 4, name: 'PMI - LTN', state: false },
            { id: 5, name: 'STN - PMI', state: false }
        ];
        this.selectedItems = [
            { id: 3, name: 'LGW - PMI' },
        ];

        this.selectedAnalysts = [this.analystGroup[0], this.analystGroup[3], this.analystGroup[6]]

        this.priorityListBehaviorSubject$.next(this.priorityItems)

        this.routeListBehaviorSubject$.next(this.routeList)

        this.priorityListBehaviorSubject$
            .subscribe((res) => {
                // console.log('res ', res)
            })
    }


    public selectSortMethod(ev: any) {

        // console.log('selectSortMethod ', ev)

        function dynamicSort(property: any) {

            var sortOrder = 1;
            // Sort function
            return function (a: any, b: any) {
                // console.log('a ', a[property], ' b ', b[property])
                let result;
                if (typeof a[property] == 'boolean') {
                    result = (a[property] > b[property]) ? -1 : (a[property] > b[property]) ? 0 : 1;
                } else {
                    result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                }

                // console.log('result ', sortOrder)
                return result * sortOrder;
            }
        }

        this.dashboard.sort(dynamicSort(ev.metric))
        //console.log('this.dashboard ', this.dashboard)

    }


    // On Theme change Dark/Light
    public onThemeChange(scheme: any) {

        this.chartThemeSelect = this.isThemeChange ? 'dark' : 'light';
        console.log('onThemeChange ', this.chartThemeSelect, ' isThemeChange ', this.isThemeChange)
    }

    public addItem(): void {
        // this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
    }

    public selectAnalysts(event: any) {
        console.log('selectAnalysts ', event)
        // this.selectedAnalysts
    }

    public selectYearlyElement(idx: number) {

        console.log('selectYearlyElement ', idx)

        // if (!this.selectedAnalysts.includes(idx)) {
        //     this.selectedAnalysts.push(idx);
        // }



        console.log('this.selectedAnalysts ', this.selectedAnalysts)
    }

    public onNdoSelect(event: any) {
        console.log('onNdoSelect ', event)
    }

    public onNdoDeSelect(event: any) {
        console.log('onNdoDeSelect ', event)
    }

}