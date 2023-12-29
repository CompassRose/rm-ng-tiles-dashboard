import { Injectable } from '@angular/core';
import { Observable, Subject, map, BehaviorSubject } from 'rxjs';
import { FlagRuns, FlightContents, FlagList, ApiFlightValues, FlagRunFlights, ApiFlagRun } from '../models/tiles.model';
import { timer, startWith, switchMap } from 'rxjs';
import { FlagsDashboardDotNetWrapper } from './Flags-dashboard-Interface';
import { DateFormatterPipe } from '../shared/pipes/dateModifierPipe';
import * as moment from 'moment';
import { flagTypes, } from '../dashboard-constants';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from "@angular/common/http";

//const dateModifierPipe = new DateFormatterPipe();

const Papa = require('papaparse')

@Injectable({
    providedIn: 'root'
})


export class DashboardTilesAPIComponent {

    public flagRuns: ApiFlagRun[] = [];

    public apiFlagsRunElement$ = new BehaviorSubject<ApiFlagRun[]>([]);

    public userFlags: FlagList[] = [];

    public activeUser: any;

    public allFlightList: any[] = [];

    public shownFlightList: FlightContents[] = [];

    public apiFlagChartData$ = new Subject<any>();

    public apiAllUsers$ = new BehaviorSubject<any>([]);

    public resetFiveMinuteTimer$ = new Subject();

    public timerObservable: Observable<number>;

    public getFlagsCounter: number;

    public allUsersInput: any[] = [];

    public apiPrioritiesSubject$ = new BehaviorSubject<any[]>([]);

    public apiFlightsByNdoSubject$ = new BehaviorSubject<any[]>([]);

    public Market_Values = './assets/csv/tiles-heatmap5.csv';
    public Market_Values_JSON = './assets/json/market-totals.json';
    public Tiles_Heatmap = './assets/csv/tiles-heatmap-fixed.csv';

    constructor(
        private http: HttpClient,
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
                    //console.log('apiFlagChartData$ ', values)
                    this.apiPrioritiesSubject$.next(values.priorityData);
                    this.apiFlightsByNdoSubject$.next(values.ndoData)
                }
            })

    }



    public getCsvData(metric: any): Observable<any[]> {

        return this.http
            .get(this.Tiles_Heatmap, { responseType: 'text' })
            .pipe(
                map(res => {
                    return this.csvJSON(res);
                }));
    }

    public getMarketCsvData(metric: any): Observable<any[]> {

        return this.http
            .get(this.Market_Values, { responseType: 'text' })
            .pipe(
                map(res => {
                    return this.csvJSON(res);
                }));
    }

    public csvJSONWithStrings(csv: any) {

        const lines = csv.split(/[\r\n]+/);

        for (let i = 0; i < lines.length; i++) {
            lines[i] = lines[i].replace(/\s/, '');
        }
        const result = [];
        const headers = lines[0].split(',');

        for (let i = 1; i < lines.length; i++) {
            const obj: any = {};
            const currentline = lines[i].split(',');
            for (let j = 0; j < headers.length; j++) {
                //console.log('j ', j, ' currentline[j] ', currentline[j])
                if (j === 0) {
                    obj[headers[j].toString()] = currentline[j];
                } else {
                    obj[headers[j]] = +currentline[j];
                }

            }
            result.push(obj);
        }

        return result;
        // return JSON.stringify(result); //JSON
    }

    public csvJSON(csv: any) {

        const lines = csv.split(/[\r\n]+/);

        for (let i = 0; i < lines.length; i++) {
            lines[i] = lines[i].replace(/\s/, '');
        }
        const result = [];
        const headers = lines[0].split(',');

        for (let i = 1; i < lines.length; i++) {
            const obj: any = {};
            const currentline = lines[i].split(',');
            for (let j = 0; j < headers.length; j++) {
                //console.log('j ', j, ' currentline[j] ', currentline[j])
                if (j === 0) {
                    obj[headers[j].toString()] = currentline[j];
                } else {
                    obj[headers[j]] = +currentline[j];
                }

            }
            result.push(obj);
        }

        return result;
        // return JSON.stringify(result); //JSON
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
        //console.log('getActiveUser ', id)
        let parser: any;
        this.flagsDashboardDotNetWrapper.GetUser(id)
            .then((response: string) => {

                parser = JSON.parse(response);
                //console.log('getActiveUser ', parser)
                //parser.userID = parser.userID.split(" ").join("");
                // parser.fullName = parser.fullName.split(" ").join("");
                //parser.userType = parser.userType.split(" ").join("");
                this.activeUser = parser;
                this.authenticationService.logIn(parser.userId);
                this.authenticationService.activeUserLoggedObj(parser);
                this.getAllAnalystUsers();
            })

    }


    public getAnalystsFlags(user: string): any {
        let parser: FlagList[] = [];
        const returnFlags = this.flagsDashboardDotNetWrapper.GetAnalystFlags(user)
            .then((response) => response)
            .then((response: string) => {
                parser = JSON.parse(response);
                parser.map((flag) => {
                    let formatted = moment(flag.processDate);
                    flag.flagTypeName = flagTypes[flag.flagType + 1].name;
                    flag.processDate = formatted.format('YYYY/M/DD h:mm A')
                    flag['flagRuns'] = [];
                    return flag;
                })
                //console.log('parser ', parser)
                this.getAnalystFlagChartData(user)
                return parser;
            })
        return returnFlags
    }


    public getFlagRuns(flagKey: number) {
        let parser: ApiFlagRun[] = [];
        const flagRuns = this.flagsDashboardDotNetWrapper.GetFlagRuns(flagKey)
            .then((response) => response)
            .then((response: string) => {
                parser = JSON.parse(response);
                this.apiFlagsRunElement$.next(parser)

            })

    }

    public getAnalystFlagChartData(userId: string) {
        let parser: any;

        this.flagsDashboardDotNetWrapper.GetAnalystFlagChartData(userId)
            .then((response: string) => {
                parser = JSON.parse(response);
                this.apiFlagChartData$.next(parser)

                // this.dashboardTilesAPIComponent.apiPrioritiesSubject$.next(values.priorityData);
                // this.apiFlightsByNdoSubject$.next(values.ndoData)

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



    public getFlightList(key: number, historyId: number): any {

        let parser: any = {};
        let myTest: ApiFlightValues;
        this.allFlightList = [];

        this.flagsDashboardDotNetWrapper.GetFlightList(key, historyId, this.activeUser.userId)
            .then((response: string) => {
                parser = JSON.parse(response);

                myTest = parser.flights.map((f: any, i: number) => {
                    let formatted = moment(f.departureDate);
                    f.departureDate = formatted.format('YYYY-MM-DD h:mm A')
                    return f;
                })

                this.allFlightList.push({ id: historyId, flights: myTest })
                // console.log('flightHolder this.allFlightList ', this.allFlightList)
            })
        // flightHolder
        //     .then((response: any) => {

        //         let myTest: FlightContents[] = [];
        //         apiTest = response.flights;
        //         myTest = apiTest.map((f: any) => {

        //             let formatted = moment(f.departureDate);
        //             f.departureDate = formatted.format('YYYY-MM-DD h:mm A')
        //             //console.log('i ', i, ' f ', f)
        //             return f;
        //         })
        //         this.allFlightList.push({ id: historyId, flights: myTest })
        //         

        //     })

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
