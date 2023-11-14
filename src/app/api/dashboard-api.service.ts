import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, merge, Observable, debounceTime, BehaviorSubject } from 'rxjs';


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

export class DashboardTilesAPIComponent implements OnInit {

    public flagRuns: any[] = []
    public activeUser: any;
    public apiUser$ = new BehaviorSubject<any>([]);
    public apiFlags$ = new BehaviorSubject<any[]>([]);
    public apiFlagRuns$ = new BehaviorSubject<any[]>([]);

    constructor(public flagsDashboardDotNetWrapper: FlagsDashboardDotNetWrapper) { }

    public ngOnInit(): void { }


    // Negative SA values form API are fine - Display them as zero
    // First time through 
    public getActiveUser(id: string) {
        console.log('getActiveUser ', id)
        let parser: any;
        this.flagsDashboardDotNetWrapper.GetUser(id)
            .then((response: string) => {
                parser = JSON.parse(response);
                console.log('getActiveUser ', parser)
                this.activeUser = parser;
                this.apiUser$.next(parser)
            })
    }


    public getAnalystsFlags(user: string) {
        let parser: any[] = [];
        let runs: any[] = [];

        this.flagsDashboardDotNetWrapper.GetAnalystFlags(user)
            .then((response: string) => {
                parser = JSON.parse(response);
                this.apiFlags$.next(parser)
                parser.forEach((flag, i) => {
                    //console.log('flag ', flag)
                    this.getFlagRuns(flag.flagKey)

                })


            })

    }

    public getSupervisorFlags(user: string) {
        let parser: any[] = [];
        this.flagsDashboardDotNetWrapper.GetSupervisorFlags(user)
            .then((response: string) => {
                parser = JSON.parse(response);
                console.log('getSupervisorFlags ', parser)

            })
    }

    public getFlagRuns(flagKey: number) {

        let parser: any[] = [];
        let fRuns: any[] = [];
        console.log('flagKey ', flagKey)

        this.flagsDashboardDotNetWrapper.GetFlagRuns(flagKey)
            .then((response: string) => {
                parser = JSON.parse(response);

                parser.forEach((flagRun) => {
                    //this.getFlightList(flag.flagKey, flag.historyId);
                    //  this.getReviews(flag.flagKey)
                    this.flagRuns.push(flagRun)
                })
                this.apiFlagRuns$.next(this.flagRuns)
                console.log('getFlagRuns ', this.flagRuns)
            })
    }

    public getFlightList(key: number, historyId: number) {
        let parser: any[] = [];
        this.flagsDashboardDotNetWrapper.GetFlightList(key, historyId)
            .then((response: string) => {
                parser = JSON.parse(response);
                console.log('getFlightList ', parser)
            })

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
