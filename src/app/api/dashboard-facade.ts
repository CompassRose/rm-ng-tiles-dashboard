import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { FlagRuns, FlightContents, FlagList, ApiFlightValues, FlagRunDev, FlagRunFlights, ApiFlagRun } from '../models/tiles.model';
import { timer, startWith, switchMap } from 'rxjs';
import { FlagsDashboardDotNetWrapper } from './Flags-dashboard-Interface';
import { DateFormatterPipe } from '../shared/pipes/dateModifierPipe';
import * as moment from 'moment';
import { AuthenticationService } from '../services/authentication.service';
import { DashboardTilesAPIComponent } from './dashboard-api.service';
import { flagTypes, priorityItems } from '../dashboard-constants';
//const dateModifierPipe = new DateFormatterPipe();

@Injectable({
    providedIn: 'root'
})

export class DashboardFacadeComponent {

    public myFlags: FlagList[] = [];
    public counter = 0;
    public flagsRunFromApi: FlagRunDev[] = [];
    //public selectedFlagRunFlights: FlagRunFlights[] = [];
    public flagNameAndType = '';
    public selectedFlagRuns: FlagRunDev[] = [];
    public flightsToPass: any[] = [];

    public apiFlags$ = new BehaviorSubject<FlagList[]>([]);
    public apiFlagsRunElement$ = new BehaviorSubject<ApiFlagRun[]>([]);

    public apiSelectedFlagRunElement$ = new BehaviorSubject<ApiFlightValues[]>([]);

    // From flag Type and Priority Controls
    public selectedPriority: any;
    public priorityListBehaviorSubject$ = new BehaviorSubject<any[]>([]);
    public flagTypeBehaviorSubject$ = new BehaviorSubject<any[]>([]);
    ////////////////////

    constructor(
        public flagsDashboardDotNetWrapper: FlagsDashboardDotNetWrapper,
        public authenticationService: AuthenticationService,
        public dashboardTilesAPIComponent: DashboardTilesAPIComponent) {

        this.selectedPriority = priorityItems[0];
        this.flagTypeBehaviorSubject$.next(flagTypes);
        this.priorityListBehaviorSubject$.next(priorityItems);


        this.apiSelectedFlagRunElement$
            .subscribe((response: any) => {
                if (response.length > 0) {
                    // console.log('flagruns ', response)

                    response.map((rf: any, i: number) => {

                        this.dashboardTilesAPIComponent.allFlightList.map((af, e: number) => {
                            if (rf.historyId === af.id) {
                                rf.flights = af.flights
                            }
                        })

                        console.log(' rf ', rf)

                        return rf;
                    })
                }
            })

        // this.dashboardTilesAPIComponent.getCsvData(this.dashboardTilesAPIComponent.Tiles_Heatmap)
        //     .subscribe((tilesHeatmap: any[]) => {
        //         console.log(' tilesHeatmap ', tilesHeatmap)
        //     })


        // this.dashboardTilesAPIComponent.getMarketCsvData(this.dashboardTilesAPIComponent.Tiles_Heatmap)
        //     .subscribe((tilesHeatmap: any[]) => {
        //         console.log(' MARKET Total ', tilesHeatmap)
        //     })


        this.apiFlags$
            .subscribe((flags: any[]) => {
                if (flags.length > 0) {
                    this.myFlags = flags;
                }
            })

        this.dashboardTilesAPIComponent.apiFlagsRunElement$
            .subscribe((flagRuns: ApiFlagRun[]) => {
                //console.log('flagRuns ', flagRuns)

                this.flagsRunFromApi = [];

                if (flagRuns.length > 0) {
                    this.myFlags[this.counter].flagRuns = flagRuns;
                    this.flagsRunFromApi.push(...flagRuns);
                    this.counter++;

                    this.flagsRunFromApi.forEach((r: FlagRunDev) => {
                        this.getFlightListsFromApi(r.flagKey, r.historyId);
                    })
                }

                if (this.counter === this.myFlags.length) {
                    this.counter = 0;
                }
                //console.log('GetFlightList ', this.dashboardTilesAPIComponent.allFlightList)
                //console.log('FACADE this.flagsRunFromApi ', this.flagsRunFromApi)
            })

    }


    public getFlightListsFromApi(key: any, id: number): FlagRunFlights {
        //console.log('getFlightLists ', key, ' id ', id)
        return this.dashboardTilesAPIComponent.getFlightList(key, id)
    }

}
