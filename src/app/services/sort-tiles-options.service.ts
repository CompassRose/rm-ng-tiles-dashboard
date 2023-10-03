
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
        // addedDay.format('M/DD/YYYY');

        // console.log('firstDay ', firstDay, ' addedDay ', addADay)

        this.dashboard = [
            { idx: 0, color: 'Brown', name: 'Overbooked Flag', priority: 1, reviewed: true, lastUpdate: '20th-July-2023', showOptions: false },
            { idx: 1, color: 'navy', name: 'Forecast Deviation', priority: 1, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 2, color: 'DarkGreen', name: 'Why Flag', priority: 1, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 3, color: 'DarkBlue', name: 'Title', priority: 1, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 4, color: 'Brown', name: 'Title', priority: 2, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 5, color: 'DarkGreen', name: 'Title', priority: 2, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 6, color: 'DarkSlateGrey', name: 'Title', priority: 2, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 7, color: 'DarkRed', name: 'Title', priority: 2, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 8, color: 'purple', name: 'Title', priority: 3, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 9, color: 'DarkGreen', name: 'Title', priority: 3, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 10, color: 'DarkSlateGrey', name: 'Title', priority: 3, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 11, color: 'navy', name: 'Title', priority: 3, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 12, color: 'Indigo', name: 'Title', priority: 4, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 13, color: 'DarkBlue', name: 'Title', priority: 4, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 14, color: 'Brown', name: 'Title', priority: 2, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 15, color: 'DarkGreen', name: 'Title', priority: 1, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 16, color: 'DarkBlue', name: 'Title', priority: 1, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 17, color: 'Brown', name: 'Title', priority: 2, reviewed: false, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 18, color: 'DarkGreen', name: 'Title', priority: 2, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
            { idx: 19, color: 'DarkSlateGrey', name: 'Title', priority: 2, reviewed: true, lastUpdate: '20th-May-2023', showOptions: false },
        ];

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
            { id: 0, name: 'LGN - STN', state: false },
            { id: 1, name: 'LGN - PMI', state: false },
            { id: 2, name: 'LTN - PMI', state: false },
            { id: 3, name: 'LGW - PMI', state: false },
            { id: 4, name: 'PMI - LTN', state: false },
            { id: 5, name: 'STN - PMI', state: false }
        ];

        this.selectedRoutes = [];


        this.priorityListBehaviorSubject$.next(this.priorityItems);

        this.routeListBehaviorSubject$.next(this.routeList);

        this.routeListBehaviorSubject$
            .subscribe((res) => {
                // console.log(' routeListBehaviorSubject$ res ', res)
            })
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