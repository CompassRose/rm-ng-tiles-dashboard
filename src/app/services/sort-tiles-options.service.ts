
import { Injectable, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { PathToAssets } from '../dashboard-constants';

import { GridsterConfig, GridsterItem } from 'angular-gridster2';

import * as moment from 'moment';



@Injectable({
    providedIn: 'root',
})




export class SortTileOptionsService {

    public dashboard: any[] = [];

    public savedDashboard: any[] = [];

    public isNdoChecked = true;

    public isThemeChange = true;

    public chartThemeSelect = 'dark';

    public selectedRoutes: any[] = [];

    public priorityItems: any[] = [];

    public selectedPriority: number = 0;

    public routeListBehaviorSubject$ = new BehaviorSubject<any[]>([]);

    public priorityListBehaviorSubject$ = new BehaviorSubject<any[]>([]);

    public analystBehaviorSubject$ = new BehaviorSubject<any[]>([]);

    public routeList: any[] = [];

    public analystGroup =
        [
            {
                idx: 0,
                name: "Guy Hawkins",
                title: 'Senior Analyst',
                state: false,
                avatar: '../assets/images/img-6525-8-01.png'
            },
            {
                idx: 1,
                name: "Teresa Webb",
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
                state: false,
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
                state: false,
                avatar: '../assets/images/img-6525-8-01.png'
            },
            {
                idx: 7,
                name: "John Anderson",
                title: 'Junior Analyst',
                state: true,
                avatar: '../assets/images/img-6525-8-02.png'
            },
            {
                idx: 8,
                name: "Willie Smish",
                title: 'Senior Analyst',
                state: true,
                avatar: '../assets/images/img-6525-8-02.png'
            },
            {
                idx: 9,
                name: "Peter Johnson",
                title: 'Senior Analyst',
                state: true,
                avatar: '../assets/images/img-6525-8-01.png'
            },
        ]

    public selectedAnalysts: any[] = [];


    constructor() {


        const observer = {
            next: (x: any) => console.log('Observer got a next value: ' + x),
            error: (err: any) => console.error('Observer got an error: ' + err),
            complete: () => console.log('Observer got a complete notification'),
        };

        this.analystBehaviorSubject$.next(this.analystGroup)

        this.analystBehaviorSubject$.subscribe(observer);

        let momentOne = moment(new Date(2023, 2, 12, 5, 0, 0));

        let firstDay = momentOne.format('M/DD/YYYY: H');

        let duration = moment.duration({ 'days': 4, 'hours': 1, 'minutes': 15 });

        let addedDay = momentOne.add(duration);

        let addADay = addedDay.format('M/DD/YYYY: H');

        addedDay.format('M/DD/YYYY');

        this.dashboard = [
            {
                idx: 0,
                color: 'Brown',
                name: 'Overbooked Flag',
                priority: 1,
                reviewed: true,
                lastUpdate: '20th-July-2023',
                showOptions: false
            },
            { idx: 1, color: 'Brown', name: 'Forecast Deviation', priority: 1, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 2, color: 'Brown', name: 'Why Flag', priority: 1, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 3, color: 'Brown', name: 'Pickup Flag', priority: 1, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 4, color: 'DarkOrange', name: 'Other Flag', priority: 2, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 5, color: 'DarkOrange', name: 'CF Lower Flag', priority: 2, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 6, color: 'DarkOrange', name: 'Overbooked Flag', priority: 2, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 7, color: 'DarkOrange', name: 'Not Selling Flag', priority: 2, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 8, color: 'DarkGreen', name: 'Element Up Flag', priority: 3, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 9, color: 'DarkGreen', name: 'New Flights', priority: 3, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 10, color: 'DarkGreen', name: 'CF Higher Flag', priority: 3, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 11, color: 'DarkGreen', name: 'CF Lower Flag', priority: 3, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 12, color: 'DarkOrange', name: 'Element Up Flag', priority: 2, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 13, color: 'Brown', name: 'Element Up Flag', priority: 1, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 14, color: 'DarkOrange', name: 'Element Up Flag', priority: 2, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 15, color: 'Brown', name: 'Element Dwn Flag', priority: 1, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 16, color: 'Brown', name: 'Someone put a long name on a flag', priority: 1, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 17, color: 'DarkOrange', name: 'CF Higher Flag', priority: 2, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 18, color: 'DarkOrange', name: 'Title', priority: 2, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 19, color: 'DarkOrange', name: 'Why Not Flag', priority: 2, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 20, color: 'Brown', name: 'Element Dwn Flag', priority: 1, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 21, color: 'Brown', name: 'Someone put a long name on a flag', priority: 1, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 22, color: 'DarkOrange', name: 'CF Higher Flag', priority: 2, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 23, color: 'DarkGreen', name: 'Title', priority: 3, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 24, color: 'DarkOrange', name: 'Why Flag', priority: 2, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            // { idx: 25, color: 'DarkOrange', name: 'CF Lower Flag', priority: 2, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            // { idx: 26, color: 'DarkOrange', name: 'Overbooked Flag', priority: 2, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            // { idx: 27, color: 'DarkOrange', name: 'Not Selling Flag', priority: 2, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            // { idx: 28, color: 'DarkGreen', name: 'Element Up Flag', priority: 3, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            // { idx: 29, color: 'DarkGreen', name: 'New Flights', priority: 3, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            // { idx: 30, color: 'Brown', name: 'Element Dwn Flag', priority: 1, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            // { idx: 31, color: 'Brown', name: 'Someone put a long name on a flag', priority: 1, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            // { idx: 32, color: 'DarkOrange', name: 'CF Higher Flag', priority: 2, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            // { idx: 33, color: 'DarkGreen', name: 'Title', priority: 3, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            // { idx: 34, color: 'DarkOrange', name: 'Why Flag', priority: 2, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
        ];

        this.selectedAnalysts = [];

        if (this.savedDashboard.length === 0) {
            this.savedDashboard = [...this.dashboard];
        }


        this.dashboard.map((db: any, i: number) => {
            db.lastUpdate = momentOne.add(duration).format('h:mm - MMM-DD-YYYY');
            // console.log('???? ', db.lastUpdate)
            return db;
        })

        this.priorityItems = [
            { id: 0, name: 'Priority', metric: 'priority' },
            { id: 1, name: 'Last Run', metric: 'lastUpdate' },
            { id: 2, name: 'Reviewed', metric: 'reviewed' }
        ];

        this.selectedPriority = this.priorityItems[0];

        this.routeList = [
            { id: 0, name: 'LGN - STN', state: true },
            { id: 1, name: 'LGN - PMI', state: true },
            { id: 2, name: 'LTN - PMI', state: true },
            { id: 3, name: 'LGW - PMI', state: true },
            { id: 4, name: 'PMI - LTN', state: true },
            { id: 5, name: 'STN - PMI', state: true }
        ];

        this.selectedRoutes = [...this.routeList];


        this.priorityListBehaviorSubject$.next(this.priorityItems);

        this.routeListBehaviorSubject$.next(this.routeList);

        this.routeListBehaviorSubject$
            .subscribe((res) => {
                // console.log(' routeListBehaviorSubject$ res ', res)
            })
    }

    // from Priority Selection
    public selectedFlag(set: any) {
        //  console.log('selectedFlag ', set)
        this.dashboard = set;
    }

    // from Priority Selection
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


    public getNumAnalystsSelected(): boolean {
        let test = false;
        if (this.selectedAnalysts.length === this.analystGroup.length) {
            test = true;
        }
        return test
    }


    public onSelectAllAnalysts() {

        let stateTest = true;

        if (this.selectedAnalysts.length === this.analystGroup.length) {
            stateTest = false;
        } else {
            this.selectedAnalysts = [];
        }


        console.log('\n\n ***********  analystGroup ===== ', stateTest)

        this.analystGroup.forEach((ag, i) => {

            ag.state = stateTest;

            if (stateTest) {
                this.analystGroup[ag.idx].state = true;
            } else {
                this.analystGroup[ag.idx].state = false;
            }

            console.log('ag ', ag, ' i ', i)

            this.onAnalystSelect(this.analystGroup[ag.idx], i, false, stateTest)
        })
        console.log('analystGroup onSelectAll ', stateTest)

    }


    public onAnalystSelect(item: any, idx: number, from: boolean, state: boolean) {

        if (!from) {

            if (state) {

                this.selectedAnalysts.push(item);
            } else {
                this.selectedAnalysts = [];
            }

        } else {

            if (!this.analystGroup[idx].state) {

                console.log('selectedAnalysts item ', item, ' idx ', idx, ' from ', from, ' state ', state)
                this.selectedAnalysts.push(item);
                this.analystGroup[idx].state = true;

            } else {

                const elementIdx = this.selectedAnalysts.findIndex(fi => {
                    console.log('fi ', fi)
                    return item.id === fi.id;
                });

                console.log('elementIdx ', elementIdx)

                this.selectedAnalysts.splice(elementIdx, 1);
                this.analystGroup[idx].state = false;
            }

        }
        console.log('onRouteSelect selectedAnalysts ', this.selectedAnalysts, '\n routeList ', this.analystGroup)
        this.analystBehaviorSubject$.next(this.analystGroup);
    }


    public onSelectAllRoutes() {

        let stateTest = true;

        if (this.selectedRoutes.length === this.routeList.length) {
            stateTest = false;
        } else {
            this.selectedRoutes = [];
        }


        console.log('\n\n ***********  routeList ===== ', stateTest)

        this.routeList.forEach((ag, i) => {

            ag.state = stateTest;

            if (stateTest) {
                this.routeList[ag.id].state = true;
            } else {
                this.routeList[ag.id].state = false;
            }

            console.log('ag ', ag, ' i ', i)

            this.onRouteSelect(this.routeList[ag.id], i, false, stateTest)
        })
        console.log('routeList onSelectAll ', stateTest)

    }


    public onRouteSelect(item: any, idx: number, from: boolean, state: boolean) {

        if (!from) {

            if (state) {

                this.selectedRoutes.push(item);
            } else {
                this.selectedRoutes = [];
            }

        } else {

            if (!this.routeList[idx].state) {

                console.log('onRouteSelect item ', item, ' idx ', idx, ' from ', from, ' state ', state)
                this.selectedRoutes.push(item);
                this.routeList[idx].state = true;

            } else {

                const elementIdx = this.selectedRoutes.findIndex(fi => {
                    console.log('fi ', fi)
                    return item.id === fi.id;
                });

                console.log('elementIdx ', elementIdx)

                this.selectedRoutes.splice(elementIdx, 1);
                this.routeList[idx].state = false;
            }

        }
        console.log('onRouteSelect selectedRoutes ', this.selectedRoutes, '\n routeList ', this.routeList)
        this.routeListBehaviorSubject$.next(this.routeList);
    }


    public clear(index: any) {
        const elementIdx = this.selectedRoutes.findIndex(fi => {
            return index.id === fi.id;
        });

        const routeIdx = this.routeList.findIndex(fi => {
            return index.id === fi.id;

        });
        this.routeList[routeIdx].state = false;
        this.selectedRoutes.splice(elementIdx, 1);
        this.routeListBehaviorSubject$.next(this.routeList);

        // console.log('clear ', this.selectedRoutes, ' elementIdx ', elementIdx, ' routeIdx ', routeIdx, ' routeList ', this.routeList)

    }

    public onNdoDeSelect(event: any) {
        console.log('onNdoDeSelect ', event)
    }

}