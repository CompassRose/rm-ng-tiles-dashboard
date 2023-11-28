
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { flagTypes, priorityItems } from '../dashboard-constants';


@Injectable({
    providedIn: 'root',
})


export class SortTileOptionsService {

    public selectedPriority: any;

    public priorityListBehaviorSubject$ = new BehaviorSubject<any[]>([]);

    public flagTypeBehaviorSubject$ = new BehaviorSubject<any[]>([]);

    constructor() {

        this.selectedPriority = priorityItems[0];
        this.flagTypeBehaviorSubject$.next(flagTypes);
        this.priorityListBehaviorSubject$.next(priorityItems);
    }

    public onNdoDeSelect(event: any) {
        console.log('onNdoDeSelect ', event)
    }

}