import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { FlagRuns, FlightContents, FlagList, ApiFlightValues, FlagRunFlights, ApiFlagRun } from '../models/tiles.model';
import { timer, startWith, switchMap } from 'rxjs';
import { FlagsDashboardDotNetWrapper } from './Flags-dashboard-Interface';
import { DateFormatterPipe } from '../shared/pipes/dateModifierPipe';
import * as moment from 'moment';
import { flagTypes, } from '../dashboard-constants';
import { AuthenticationService } from '../services/authentication.service';

//const dateModifierPipe = new DateFormatterPipe();

@Injectable({
    providedIn: 'root'
})


export class DashboardTilesAPIComponent {

    public flagRuns: ApiFlagRun[] = [];

    //public apiFlagRuns$ = new Subject<ApiFlagRun[]>();

    public apiFlagsRunElement$ = new BehaviorSubject<ApiFlagRun[]>([]);

    public userFlags: FlagList[] = [];

    public apiFlags$ = new BehaviorSubject<FlagList[]>([]);

    public activeUser: any;

    public allFlightList: any[] = [];

    public shownFlightList: FlightContents[] = [];

    public apiFlagsRunFlight$ = new BehaviorSubject<FlagRunFlights[]>([]);

    public apiFlagChartData$ = new Subject<any>();

    public apiAllUsers$ = new BehaviorSubject<any>([]);




    public resetFiveMinuteTimer$ = new Subject();

    public timerObservable: Observable<number>;

    public getFlagsCounter: number;

    public allUsersInput: any[] = [];

    public apiPrioritiesSubject$ = new BehaviorSubject<any[]>([]);
    public apiFlightsByNdoSubject$ = new BehaviorSubject<any[]>([]);


    constructor(
        public flagsDashboardDotNetWrapper: FlagsDashboardDotNetWrapper,
        public authenticationService: AuthenticationService) {

        this.initializeTimer();

        this.timerObservable.subscribe((val: any) => {
            this.getFlagsCounter = val;

            if (this.getFlagsCounter > 300) {
                console.log('Restarting 5 Minute Timer ', this.getFlagsCounter)
                this.restartTimer()
            }
        });

        this.apiFlagChartData$
            .subscribe((values: any) => {
                if (values) {
                    // console.log('apiFlagChartData$ ', values)
                    this.apiPrioritiesSubject$.next(values.priorityData);
                    this.apiFlightsByNdoSubject$.next(values.ndoData)
                }
            })

    }


    public toOverviewWithFlightString(flightStr: string, key: number) {
        this.flagsDashboardDotNetWrapper.ToOverview(flightStr, key, this.activeUser.userId);
        // @ts-ignore
        const userObj: any = JSON.parse(window.localStorage.getItem('currentUser'));
        console.log('userObj ', userObj.userId);

        setTimeout(() => {
            this.getAnalystsFlags(userObj.userId);
        }, 1000);
    }


    public initializeTimer(): void {
        this.timerObservable = this.resetFiveMinuteTimer$.pipe(
            startWith(void 0),
            switchMap(() => timer(1000, 1000))
        );
    }


    public restartTimer(): void {
        this.resetFiveMinuteTimer$.next(void 0);
    }



    public getActiveUser(id: string) {

        let parser: any;
        this.flagsDashboardDotNetWrapper.GetUser(id)
            .then((response: string) => {
                //console.log('getActiveUser ', response)
                parser = JSON.parse(response);
                //parser.userID = parser.userID.split(" ").join("");
                // parser.fullName = parser.fullName.split(" ").join("");
                //parser.userType = parser.userType.split(" ").join("");
                this.activeUser = parser;

                this.authenticationService.logIn(parser);
                this.getAllAnalystUsers()
            })
    }




    public getAnalystsFlags(user: string) {
        ///console.log('getActiveUser ', ' user ', user)
        let parser: FlagList[] = [];


        this.flagsDashboardDotNetWrapper.GetAnalystFlags(user)
            .then((response: string) => {
                //console.log('GetAnalystFlags response ', response)
                parser = JSON.parse(response);
                this.userFlags = [];
                parser.forEach((flag) => {
                    let formatted = moment(flag.processDate);
                    flag.flagTypeName = flagTypes[flag.flagType + 1].name;
                    flag.processDate = formatted.format('YYYY/M/DD h:mm A')
                    flag['flagRuns'] = [];
                    this.userFlags.push(flag)
                })
                //console.log('this.userFlags ', this.userFlags)
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
        console.log('getFlagRuns ', flagKey)
        let parser: ApiFlagRun[] = [];
        this.flagsDashboardDotNetWrapper.GetFlagRuns(flagKey)
            .then((response: string) => {
                parser = JSON.parse(response);
                this.apiFlagsRunElement$.next(parser)
            })
    }



    public getFlightList(key: number, historyId: number): any {

        let parser: any = {};
        let myTest: ApiFlightValues;
        let apiTest;
        this.allFlightList = [];

        const flightHolder = this.flagsDashboardDotNetWrapper.GetFlightList(key, historyId, this.activeUser.userId)
            .then((response: string) => {
                parser = JSON.parse(response);
                return parser
            })
        flightHolder
            .then((response: any) => {

                let myTest: FlightContents[] = [];
                apiTest = response;
                myTest = apiTest.flights.map((f: any, i: number) => {
                    let formatted = moment(f.departureDate);
                    f.departureDate = formatted.format('YYYY-MM-DD h:mm A')
                    return f;
                })

                //console.log('GetFlightList ', myTest)
                this.shownFlightList = myTest;

                this.allFlightList.push({ id: historyId, value: apiTest })
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
