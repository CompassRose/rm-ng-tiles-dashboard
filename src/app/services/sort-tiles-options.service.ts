
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { flagTypes } from '../dashboard-constants'



@Injectable({
    providedIn: 'root',
})




export class SortTileOptionsService {

    public dashboard: any[] = [];

    public savedDashboard: any[] = [];

    public priorityItems: any[] = [];

    public flagTypes: any[] = [];

    public selectedPriority: any;

    public priorityListBehaviorSubject$ = new BehaviorSubject<any[]>([]);

    public flagTypeBehaviorSubject$ = new BehaviorSubject<any[]>([]);


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


        if (this.savedDashboard.length === 0) {
            this.savedDashboard = [...this.dashboard];
        }


        // this.dashboard.map((db: any, i: number) => {
        //     db.lastUpdate = momentOne.add(duration).format('h:mm - MMM-DD-YYYY');
        //     // console.log('???? ', db.lastUpdate)
        //     return db;
        // })

        // this.flagTypes = [
        //     { id: 0, name: 'Exception', metric: 'exception' },
        //     { id: 1, name: 'Alert', metric: 'alert' },
        //     { id: 2, name: 'Action', metric: 'action' },
        // ];

        this.priorityItems = [
            { id: 0, name: 'Priority', metric: 'priority' },
            { id: 1, name: 'Last Run', metric: 'lastUpdate' },
            { id: 2, name: 'Reviewed', metric: 'reviewed' }
        ];



        this.selectedPriority = this.priorityItems[0];

        this.selectedFlags = [...this.flagTypeSelect];

        this.priorityListBehaviorSubject$.next(this.priorityItems);

    }


    // From Flag Type dropdown
    public selectFlagTypes(event: any) {

        console.log('selectFlagTypes ', event)

        flagTypes[event.id]
        // this.userFlags.forEach((f,i)=>{

        // })
        let flagListReturn;
        // = [...this.selectedFlags];

        if (event === 'All') {
            flagListReturn = this.selectedFlags;
        } else {
            flagListReturn = this.selectedFlags.filter((flag: any) => {
                console.log('flag ', flag)
                if (flag.FlagType === event.id) {
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


    public onNdoDeSelect(event: any) {
        console.log('onNdoDeSelect ', event)
    }

}