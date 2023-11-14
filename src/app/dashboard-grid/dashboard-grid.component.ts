import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SortTileOptionsService } from '../services/sort-tiles-options.service';
import { MockService } from '../services/tiles-mock-api';
import { DashboardTilesAPIComponent } from '../api/dashboard-api.service'

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



  public selectionOptions: any[] = [
    { idx: 0, name: 'View History' },
    { idx: 1, name: 'Go to Rule' }
  ];

  constructor(public mockTileService: MockService,
    public sortTileOptionsService: SortTileOptionsService,
    public dashboardTilesAPIComponent: DashboardTilesAPIComponent) {

    // console.log('user ', user)
    this.mockTileService.apiFlagsSubject$.subscribe((res: any) => {
      if (res.length > 0) {
      }
    })
    this.dashboardTilesAPIComponent.apiFlagRuns$
      .subscribe((flag) => {
        if (flag.length > 0) {
          //console.log('{{{{{}}}}}}}apiFlagRuns$ ', flag)
        }

      })
  }


  public updatePassengers(event: any) {
    console.log('updatePassengers ', event)
    //this.passengerCount = event;
  }



}
