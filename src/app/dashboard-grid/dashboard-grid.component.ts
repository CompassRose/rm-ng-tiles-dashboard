import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SortTileOptionsService } from '../services/sort-tiles-options.service';
import { MockService } from '../services/tiles-mock-api';
import { DashboardTilesAPIComponent } from '../api/dashboard-api.service'
import { FlagList, FlagRuns } from '../models/tiles.model';

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

  public myFlags: any[] = [];

  public counter = 0

  public selectionOptions: any[] = [
    { idx: 0, name: 'View History' },
    { idx: 1, name: 'Go to Rule' }
  ];

  constructor(public mockTileService: MockService,
    public sortTileOptionsService: SortTileOptionsService,
    public dashboardTilesAPIComponent: DashboardTilesAPIComponent) {


    this.dashboardTilesAPIComponent.apiFlagsRunElement$
      .subscribe((flagRuns: any[]) => {
        if (flagRuns.length) {
          this.myFlags[this.counter].flagRuns = flagRuns;
          this.flagsRunFromApi.push(flagRuns)
          this.counter++;
        }
      })


    this.dashboardTilesAPIComponent.apiFlags$
      .subscribe((flags: any[]) => {
        this.myFlags = flags;
        flags.forEach((f, i) => {
          this.dashboardTilesAPIComponent.getFlagRuns(f.flagKey)
        })
        // console.log('{{{{{ apiFlag }}}}}} ', this.myFlags)
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


          //console.log(' i  ', i, ' flagKey ', sendFlagRun[i])
          // for (let e = 0; e < keyHolder.length; e++) {

          //   for (let i = 0; i < sendFlagRun.length; i++) {

          //     if (keyHolder[e] === sendFlagRun[i].flagKey) {

          //       // console.log('  ===   ', keyHolder[e], ' keyHolder ', sendFlagRun[i])
          //       // console.log(' i  ', i, ' flagKey ', sendFlagRun[i])

          //       this.dashboardTilesAPIComponent.getFlightList(sendFlagRun[i].flagKey, sendFlagRun[i].historyId)

          //         .then((response: string) => {
          //           return response;
          //         })
          //         .then((flights: any) => {
          //           sendFlagRun[i].flights = flights.flights;
          //         })

          //       // console.log('   this.flagsRunFromApi', sendFlagRun)
          //       break;
          //     }
          //   }
          // }
        }
      })
  }


  public updatePassengers(event: FlagList) {
    console.log('updatePassengers ', event)
    //this.passengerCount = event;
  }



}
