import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, merge, Observable, Subject, debounceTime, BehaviorSubject } from 'rxjs';
import { FlagRuns, FlagList } from '../models/tiles.model';

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

    public flagRuns: FlagRuns[] = [];

    public userFlags: FlagList[] = [];

    public activeUser: any;

    public allFlightList: any[] = [];

    public apiUser$ = new BehaviorSubject<any>([]);

    public apiAllUsers$ = new BehaviorSubject<any>([]);

    public apiFlags$ = new BehaviorSubject<FlagList[]>([]);

    public apiFlagsRunElement$ = new BehaviorSubject<FlagRuns[]>([]);

    public apiFlagRuns$ = new Subject<FlagRuns[]>();

    constructor(public flagsDashboardDotNetWrapper: FlagsDashboardDotNetWrapper) { }

    public ngOnInit(): void { }


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
                this.apiUser$.next(parser)
                this.getAllAnalystUsers()
            })
    }



    public getAnalystsFlags(user: string) {

        let parser: FlagList[] = [];

        this.flagsDashboardDotNetWrapper.GetAnalystFlags(user)
            .then((response: string) => {
                parser = JSON.parse(response);
                parser.forEach((flag, i) => {
                    flag.name = flag.name.split(" ").join("");
                    flag['flagRuns'] = []
                    this.userFlags.push(flag)
                })
                this.apiFlags$.next(this.userFlags);
                this.getAnalystFlagChartData(user)
            })
    }


    public getAnalystFlagChartData(userId: string) {
        let parser: any;

        this.flagsDashboardDotNetWrapper.GetAnalystFlagChartData(userId)
            .then((response: string) => {
                parser = JSON.parse(response);
                console.log('GetAnalystFlagChartData  ', parser);
            })

    }

    public getAllAnalystUsers() {
        let parser: any;
        this.flagsDashboardDotNetWrapper.GetAllAnalystUsers()
            .then((response: string) => {
                parser = JSON.parse(response);
                parser.map((p: any, i: number) => {
                    p.userID = p.userID.split(" ").join("");
                    p.fullName = p.fullName.split(" ").join("");
                    p.userType = p.userType.split(" ").join("");
                    return p
                })
                this.apiAllUsers$.next(parser)
            })

    }

    public getSupervisorFlags(user: string) {
        let parser: FlagList[] = [];
        this.flagsDashboardDotNetWrapper.GetSupervisorFlags(user)
            .then((response: string) => {
                parser = JSON.parse(response);
                // console.log('getSupervisorFlags ', parser)
            })
    }


    public getFlagRuns(flagKey: number) {
        let parser: FlagRuns[] = [];
        this.flagsDashboardDotNetWrapper.GetFlagRuns(flagKey)
            .then((response: string) => {

                parser = JSON.parse(response);
                this.apiFlagsRunElement$.next(parser)
            })
    }


    public renderFlightList(): any[] {
        // this.allFlightList = flights;

        console.log('getFlightList ', this.allFlightList)
        return this.allFlightList;
    }


    public getFlightList(key: number, historyId: number): any {

        // console.log('getFlightList ', key, ' historyId ', historyId)
        let parser: any;
        let myFlights: any;
        return this.flagsDashboardDotNetWrapper.GetFlightList(key, historyId)
            .then((response: string) => {
                parser = JSON.parse(response);
                return parser
            })



        //return parser.flights
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
