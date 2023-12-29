import { Component, OnInit } from '@angular/core';
import { DashboardTilesAPIComponent } from '../api/dashboard-api.service';
import { FlagList, FlagRunFlights, FlightContents, FlagRunDev, ApiFlagRun, FlagRuns } from '../models/tiles.model';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { AuthenticationService } from '../services/authentication.service';
import { DashboardFacadeComponent } from '../api/dashboard-facade';



export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]
  ),
  transition(':leave',
    [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
  )
]);

@Component({
  selector: 'app-grid',
  templateUrl: './dashboard-grid.component.html',
  styleUrls: ['./dashboard-grid.component.scss'],
  animations: [fadeAnimation]
})



export class DashboardGridComponent {

  public selectedFlagRuns: FlagRunDev[] = [];

  public myFlag: FlagList[] = [];

  public activeFlag: FlagList;

  public counter = 0

  public flagNameAndType = '';

  public pathId: any;

  public showEditorModal = false;

  public selectionOptions: any[] = [
    { idx: 0, name: 'View History' },
    { idx: 1, name: 'Go to Rule' }
  ];

  public showHistoryModal = false;
  public activeModal: number;
  public openedItem: number;
  public showOptions = false;

  constructor(
    public dashboardFacadeComponent: DashboardFacadeComponent,
    public authenticationService: AuthenticationService,
    public dashboardTilesAPIComponent: DashboardTilesAPIComponent) {



    this.dashboardFacadeComponent.apiFlags$
      .subscribe((flags: any[]) => {

        if (flags.length > 0) {
          this.myFlag = flags;
          flags.forEach((f: any, i: number) => {
            if (f.flagRuns.length === 0) {
              this.dashboardTilesAPIComponent.getFlagRuns(f.flagKey);
            }
          })
        }
      })
  }


  public getPriorityColor(idx: number): string {
    const testColors = ['Navy', 'OrangeRed', 'Green', 'DarkGreen', 'DodgerBlue', 'Red', 'Purple', 'MediumSeaGreen', 'Peru'];
    return testColors[idx - 1];
  }

  public closeModal(key: number) {
    this.showEditorModal = false;
  };

  public openModal(key: number) {
    this.activeModal = key;
    this.dashboardFacadeComponent.apiSelectedFlagRunElement$.next(this.activeFlag.flagRuns)
    this.showEditorModal = true;
  };



  public updateFlagRun(event: any) {

    this.activeFlag = event;
    this.selectedFlagRuns = event.flagRuns;
    this.flagNameAndType = `${event.flagTypeName}: ${event.name}`;
    console.log('this.myFlag ', this.activeFlag)
    this.openModal(123)
  }
}
