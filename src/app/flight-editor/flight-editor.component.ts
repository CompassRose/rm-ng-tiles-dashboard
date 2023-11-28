import { Component } from '@angular/core';
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
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]
  ),
  transition(':leave',
    [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
  )
]);

@Component({
  selector: 'flight-editor',
  templateUrl: './flight-editor.component.html',
  styleUrls: ['./flight-editor.component.scss']
})



export class FlightEditorComponent {

  public showOptions = false;

  public openedItem: number;

  public sendDashboardItems = [];

  public flagsRunFromApi: any[] = [];

  public selectedFlagRuns: any[] = [];

  public selectedFlagRunFlights: any[] = [];

  public myFlags: any[] = [];

  public counter = 0

  public flightsToPass: any[] = [];

  public flagNameAndType = '';

  public pathId: any;

  public selectionOptions: any[] = [
    { idx: 0, name: 'View History' },
    { idx: 1, name: 'Go to Rule' }
  ];

  constructor(

    public dashboardTilesAPIComponent: DashboardTilesAPIComponent) {

    this.dashboardTilesAPIComponent.apiFlagsRunFlight$
      .subscribe((flights: any) => {
        if (flights.length > 0) {
          console.log('Subscribed  flights ', flights)
        }
      })

    // this.dashboardTilesAPIComponent.apiFlagsRunElement$
    //   .subscribe((flagRuns: any[]) => {
    //     if (flagRuns.length > 0) {
    //       this.myFlags[this.counter].flagRuns = flagRuns;
    //       this.flagsRunFromApi.push(flagRuns)
    //       this.counter++;
    //     }

    //     this.selectedFlagRunFlights = flagRuns.map((r: any, i: number) => {
    //       this.getFlightLists(r.flagKey, r.historyId)

    //     })
    //   })


    this.dashboardTilesAPIComponent.apiFlags$
      .subscribe((flags: FlagList[]) => {
        this.myFlags = flags;
        flags.forEach((f, i) => {
          this.dashboardTilesAPIComponent.getFlagRuns(f.flagKey)
        })
      })


    this.dashboardTilesAPIComponent.apiFlagRuns$
      .subscribe((sendFlagRun: FlagRuns[]) => {
        let keyHolder: number[] = [];
        if (sendFlagRun.length > 0) {
          sendFlagRun.forEach((r: any, e: number) => {
            if (!keyHolder.includes(r.flagKey)) {
              keyHolder.push(r.flagKey)
            }
          })
        }
      })
  }

  public ngOnInit(): void {

  }

  public getFlightLists(key: any, id: number) {
    return this.dashboardTilesAPIComponent.getFlightList(key, id)
  }


  public updateFlagRun(event: any) {
    console.log('event ', event)

    this.selectedFlagRuns = event.flagRuns;
    this.flagNameAndType = `${event.flagTypeName}: ${event.name} `
    event.flagRuns.map((r: any, e: number) => {

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
