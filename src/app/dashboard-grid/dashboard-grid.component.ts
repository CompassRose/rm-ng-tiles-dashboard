import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SortTileOptionsService } from '../services/sort-tiles-options.service';
import { DashboardTilesAPIComponent } from '../api/dashboard-api.service'
import { FlagList, FlagRuns } from '../models/tiles.model';
import { finalize, map } from "rxjs/operators";

import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';


export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]
  ),
  transition(':leave',
    [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
  )
]);

@Component({
  selector: 'app-dashboard-grid',
  templateUrl: './dashboard-grid.component.html',
  styleUrls: ['./dashboard-grid.component.scss'],
  animations: [fadeAnimation]
})



export class DashboardGridComponent {

  public showOptions = false;

  public openedItem: number;

  public sendDashboardItems = [];

  public flagsRunFromApi: any[] = [];

  public selectedFlagRuns: any[] = [];

  public selectedFlagRunFlights: any[] = [];

  public myFlags: any[] = [];

  public counter = 0

  public flightsToPass: any[] = [];

  public selectionOptions: any[] = [
    { idx: 0, name: 'View History' },
    { idx: 1, name: 'Go to Rule' }
  ];

  constructor(
    public sortTileOptionsService: SortTileOptionsService,
    public dashboardTilesAPIComponent: DashboardTilesAPIComponent) {

    this.dashboardTilesAPIComponent.apiFlagsRunFlight$

      .subscribe((flights: any) => {
        if (flights.length > 0) {
          console.log('Subscribed  flights ', flights)
        }

      })


    this.dashboardTilesAPIComponent.apiFlagsRunElement$

      .subscribe((flagRuns: any[]) => {

        if (flagRuns.length > 0) {
          this.myFlags[this.counter].flagRuns = flagRuns;
          this.flagsRunFromApi.push(flagRuns)
          this.counter++;
        }

        this.selectedFlagRunFlights = flagRuns.map((r: any, i: number) => {
          this.getFlightLists(r.flagKey, r.historyId)

        })
      })


    this.dashboardTilesAPIComponent.apiFlags$
      .subscribe((flags: any[]) => {
        this.myFlags = flags;
        flags.forEach((f, i) => {
          this.dashboardTilesAPIComponent.getFlagRuns(f.flagKey)
        })
      })


    this.dashboardTilesAPIComponent.apiFlagRuns$
      .subscribe((sendFlagRun: FlagRuns[]) => {
        // console.log('sendFlagRun ', sendFlagRun)
        let keyHolder: number[] = [];
        if (sendFlagRun.length > 0) {
          sendFlagRun.forEach((r: any, e: number) => {
            if (!keyHolder.includes(r.flagKey)) {
              keyHolder.push(r.flagKey)
            }
          })
          //  console.log(' i  ', ' flagKey ', sendFlagRun, ' keyHolder ',)
        }
      })
  }

  public getFlightLists(key: any, id: number) {
    return this.dashboardTilesAPIComponent.getFlightList(key, id)
  }


  public updateFlagRun(event: any) {


    this.selectedFlagRuns = event;

    event.map((r: any, e: number) => {

      this.dashboardTilesAPIComponent.allFlightList.forEach((fl, i) => {
        if (r.historyId === fl.id) {
          this.selectedFlagRuns[e].flights = fl;
          this.flightsToPass.push(fl)
        }
      })
    })

    this.dashboardTilesAPIComponent.apiFlagsRunFlight$.next(this.flightsToPass)

  }


}
