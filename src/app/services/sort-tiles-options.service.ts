
import { Injectable, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { FlightGroups } from '../dashboard-constants';

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

    public flagTypes: any[] = [];

    public selectedPriority: any;

    public routeListBehaviorSubject$ = new BehaviorSubject<any[]>([]);

    public priorityListBehaviorSubject$ = new BehaviorSubject<any[]>([]);

    public flagTypeBehaviorSubject$ = new BehaviorSubject<any[]>([]);

    public flightGroups = FlightGroups;

    public routeList: any[] = [];


    // Moved from Mock
    public selectedFlags: any;

    public flagTypeSelect: any[] = [];

    public apiFlagsSubject$ = new BehaviorSubject<any[]>([]);

    constructor() {


        const observer = {
            next: (x: any) => console.log('Observer got a next value: ' + x),
            error: (err: any) => console.error('Observer got an error: ' + err),
            complete: () => console.log('Observer got a complete notification'),
        };


        // this.allUserListSubject$.next(this.analystGroup)

        // this.allUserListSubject$.subscribe(observer);

        let momentOne = moment(new Date(2023, 2, 12, 5, 0, 0));

        let firstDay = momentOne.format('M/DD/YYYY: H');

        let duration = moment.duration({ 'days': 4, 'hours': 1, 'minutes': 15 });

        let addedDay = momentOne.add(duration);

        let addADay = addedDay.format('M/DD/YYYY: H');

        addedDay.format('M/DD/YYYY');


        if (this.savedDashboard.length === 0) {
            this.savedDashboard = [...this.dashboard];
        }


        this.dashboard.map((db: any, i: number) => {
            db.lastUpdate = momentOne.add(duration).format('h:mm - MMM-DD-YYYY');
            // console.log('???? ', db.lastUpdate)
            return db;
        })

        this.flagTypes = [
            { id: 0, name: 'Alert', metric: 'alert' },
            { id: 1, name: 'Action', metric: 'action' },
            { id: 2, name: 'Exception', metric: 'exception' }
        ];

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

        // this.selectedFlags = [...this.flagTypeSelect];

        this.selectedRoutes = [...this.routeList];

        this.priorityListBehaviorSubject$.next(this.priorityItems);

        this.routeListBehaviorSubject$.next(this.routeList);

        this.routeListBehaviorSubject$
            .subscribe((res) => {
                // console.log(' routeListBehaviorSubject$ res ', res)
            })
    }


    // From Flag Type dropdown
    public selectFlagTypes(event: any) {
        console.log('selectFlagTypes ', event)
        let flagListReturn = [...this.selectedFlags];
        if (event === 'All') {
            flagListReturn = this.selectedFlags
        } else {
            flagListReturn = this.selectedFlags.filter((flag: any) => {
                if (flag.FlagType === event) {
                    return flag
                }
            })
        }
        this.apiFlagsSubject$.next(flagListReturn)
    }


    public generateFlagTypeGroup(items: any) {

        this.flagTypeSelect.push('All');

        items.forEach((it: any, i: number) => {
            if (!this.flagTypeSelect.includes(it.FlagType)) {
                this.flagTypeSelect.push(it.FlagType)
            }
        })
        console.log('this.flagTypeSelect ', this.flagTypeSelect)
        this.flagTypeBehaviorSubject$.next(this.flagTypeSelect)

    }

    // // from Priority Selection
    // public selectedFlag(set: any) {
    //     console.log('selectedFlag ', set)
    //     this.dashboard = set;
    // }

    // from Priority Selection
    public selectSortMethod(ev: any) {

        console.log('selectSortMethod ', ev)

        function dynamicSort(property: any) {

            var sortOrder = 1;
            // Sort function
            return function (a: any, b: any) {
                console.log('a ', a[property], ' b ', b[property])
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

        this.dashboard.sort(dynamicSort(ev.metric));

        console.log('this.dashboard ', this.dashboard)

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