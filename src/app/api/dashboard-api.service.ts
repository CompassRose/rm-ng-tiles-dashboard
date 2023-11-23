import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, merge, Observable, Subject, debounceTime, BehaviorSubject } from 'rxjs';
import { FlagRuns, FlagList, UserModel } from '../models/tiles.model';
import { of, timer, from, startWith, tap, finalize, concatMap, takeUntil, interval, filter, switchMap, takeWhile } from 'rxjs';



import { environment } from '../../environments/environment.development';

// import {  } from '../models/tiles.model';
import { FlagsDashboardDotNetWrapper } from './Flags-dashboard-Interface';

import { DateFormatterPipe } from '../shared/pipes/dateModifierPipe';


const dateModifierPipe = new DateFormatterPipe();

@Injectable({
    providedIn: 'root'
})

// 1371
//1372

export class DashboardTilesAPIComponent {

    public flagRuns: FlagRuns[] = [];

    public userFlags: FlagList[] = [];

    public activeUser: any;

    public allFlightList: any[] = [];

    public apiLoggedInUser$ = new BehaviorSubject<any>([]);

    public apiFlagChartData$ = new Subject<any>();

    public apiAllUsers$ = new BehaviorSubject<any>([]);

    //public showHistoryModal$ = new BehaviorSubject<Boolean>(false);

    public apiFlags$ = new BehaviorSubject<FlagList[]>([]);

    public apiFlagsRunElement$ = new BehaviorSubject<FlagRuns[]>([]);

    public apiFlagsRunFlight$ = new BehaviorSubject<any[]>([]);

    public apiFlagRuns$ = new Subject<FlagRuns[]>();

    public resetFiveMinuteTimer$ = new Subject();

    public timerObservable: Observable<number>;

    public getFlagsCounter: number;

    public allUsersInput: any[] = [];



    constructor(public flagsDashboardDotNetWrapper: FlagsDashboardDotNetWrapper) {

        this.initializeTimer();

        this.timerObservable.subscribe((val: any) => {
            this.getFlagsCounter = val;

            // if (this.getFlagsCounter % 5 === 0) {
            //     //  console.log('       Counter >>>>>>>  ', this.getFlagsCounter);
            // }

            if (this.getFlagsCounter > 300) {
                console.log('Restarting 5 Minute Timer ', this.getFlagsCounter)
                this.restartTimer()
            }
        });

    }


    public toOverviewWithFlightString(flightStr: string) {
        this.flagsDashboardDotNetWrapper.ToOverview(flightStr);
    }


    public initializeTimer(): void {
        // console.log('initializing Timer ', this.getFlagsCounter)
        this.timerObservable = this.resetFiveMinuteTimer$.pipe(
            startWith(void 0),
            switchMap(() => timer(1000, 1000))
        );
    }


    public restartTimer(): void {
        this.resetFiveMinuteTimer$.next(void 0);
    }


    // Negative SA values form API are fine - Display them as zero
    // First time through 
    public getActiveUser(id: string) {

        let parser: any;
        this.flagsDashboardDotNetWrapper.GetUser(id)
            .then((response: string) => {
                parser = JSON.parse(response);
                parser.userID = parser.userID.split(" ").join("");
                parser.fullName = parser.fullName.split(" ").join("");
                parser.userType = parser.userType.split(" ").join("");
                this.activeUser = parser;
                console.log('getActiveUser ', this.activeUser)
                this.apiLoggedInUser$.next(parser)
                this.getAllAnalystUsers()
            })
    }




    public getAnalystsFlags(user: string) {
        // console.log('getActiveUser ', ' user ', user)
        let parser: FlagList[] = [];

        this.flagsDashboardDotNetWrapper.GetAnalystFlags(user)
            .then((response: string) => {
                //console.log('GetAnalystFlags response ', response)
                parser = JSON.parse(response);
                parser.forEach((flag, i) => {
                    //flag.name = flag.name.split(" ").join("");
                    flag['flagRuns'] = [];
                    this.userFlags.push(flag)
                })
                console.log('this.userFlags ', this.userFlags)
                this.apiFlags$.next(this.userFlags);
                this.getAnalystFlagChartData(user)
            })
    }


    public getAnalystFlagChartData(userId: string) {
        let parser: any;

        this.flagsDashboardDotNetWrapper.GetAnalystFlagChartData(userId)
            .then((response: string) => {
                parser = JSON.parse(response);
                this.apiFlagChartData$.next(parser)
                //console.log('GetAnalystFlagChartData  ', parser);
            })

    }

    public getAllAnalystUsers() {
        let parser: any;
        this.flagsDashboardDotNetWrapper.GetAllAnalystUsers()
            .then((response: string) => {
                parser = JSON.parse(response);

                parser.map((p: any, i: number) => {
                    // p.userID = p.userID.split(" ").join("");
                    // p.fullName = p.fullName.split(" ").join("");
                    // p.userType = p.userType.split(" ").join("");
                    return p
                })

                this.allUsersInput = parser
                this.apiAllUsers$.next(parser)
            })

    }

    public getSupervisorFlags(user: string) {
        let parser: FlagList[] = [];
        this.flagsDashboardDotNetWrapper.GetSupervisorFlags(user)
            .then((response: string) => {
                parser = JSON.parse(response);
                //console.log('getSupervisorFlags ', parser)
            })
    }


    public getFlagRuns(flagKey: number) {
        let parser: FlagRuns[] = [];
        this.flagsDashboardDotNetWrapper.GetFlagRuns(flagKey)
            .then((response: string) => {
                //console.log('getFlagRuns response ', response)
                parser = JSON.parse(response);
                this.apiFlagsRunElement$.next(parser)
            })
    }



    public getFlightList(key: number, historyId: number): any {

        let parser: any = {};
        let myTest;
        this.allFlightList = []
        const flightHolder = this.flagsDashboardDotNetWrapper.GetFlightList(key, historyId)
            .then((response: string) => {
                //console.log('getFlightList ', key, ' historyId ', historyId)

                parser = JSON.parse(response);

                //  console.log('       getFlightList  ', ' tester ', ' parser ', parser)
                return parser
            })
        flightHolder
            .then((response: any) => {

                myTest = response;
                // console.log(' myTest ', myTest)
                this.allFlightList.push({ id: historyId, value: myTest })
            })


        //console.log(' tester2 this.allFlightList ', myTest)
        //return this.allFlightList
    }

    public getReviews(key: number) {
        let parser: any[] = [];
        this.flagsDashboardDotNetWrapper.GetReviews(key)
            .then((response: string) => {
                parser = JSON.parse(response);
                // console.log('getReviews ', parser)
            })

    }


}
