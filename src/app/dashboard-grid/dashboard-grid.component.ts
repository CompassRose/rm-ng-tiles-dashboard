import { Component } from '@angular/core';
import { DashboardTilesAPIComponent } from '../api/dashboard-api.service'
import { FlagList, FlagRunFlights, FlightContents, FlagRunDev, ApiFlagRun, FlagRuns } from '../models/tiles.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragMove } from '@angular/cdk/drag-drop';

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
import { AuthenticationService } from '../services/authentication.service';


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

  public showOptions = false;

  public openedItem: number;

  public sendDashboardItems = [];

  public flagsRunFromApi: ApiFlagRun[] = [];

  public selectedFlagRuns: FlagRunDev[] = [];

  public selectedFlagRunFlights: FlagRunFlights[] = [];

  public myFlags: FlagList[] = [];

  public counter = 0

  public flightsToPass: any[] = [];

  public flagNameAndType = '';

  public pathId: any;

  public showEditorModal = false;

  public selectionOptions: any[] = [
    { idx: 0, name: 'View History' },
    { idx: 1, name: 'Go to Rule' }
  ];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public authenticationService: AuthenticationService,
    public dashboardTilesAPIComponent: DashboardTilesAPIComponent) {


    this.authenticationService.isUserLoginSubject$
      .subscribe((user: any) => {
        console.log('authenticationService Subscribed  user ', user)
      })

    // this.dashboardTilesAPIComponent.apiFlagsRunFlight$
    //   .subscribe((flights: any) => {
    //     if (flights.length > 0) {
    //       console.log('Subscribed  flights ', flights)
    //     }
    //   })


    // this.dashboardTilesAPIComponent.apiFlagRuns$
    //   .subscribe((sendFlagRun: ApiFlagRun[]) => {
    //     console.log('sendFlagRun ', sendFlagRun)
    //     let keyHolder: number[] = [];
    //     if (sendFlagRun.length > 0) {
    //       sendFlagRun.forEach((r: ApiFlagRun, e: number) => {
    //         if (!keyHolder.includes(r.flagKey)) {
    //           keyHolder.push(r.flagKey)
    //         }
    //       })
    //       console.log('keyHolder ', keyHolder)
    //     }
    //   })

    this.dashboardTilesAPIComponent.apiFlagsRunElement$
      .subscribe((flagRuns: ApiFlagRun[]) => {
        console.log('flagRuns ', flagRuns)
        if (flagRuns.length > 0) {
          this.myFlags[this.counter].flagRuns = flagRuns;
          this.flagsRunFromApi.push(...flagRuns);
          this.counter++;

          this.flagsRunFromApi.map((r: ApiFlagRun) => {
            return this.getFlightLists(r.flagKey, r.historyId);
          })
        }

        if (this.counter === this.myFlags.length) {
          this.counter = 0;
        }
        //console.log('this.selectedFlagRunFlights ', this.selectedFlagRunFlights)
      })


    this.dashboardTilesAPIComponent.apiFlags$
      .subscribe((flags: any[]) => {
        if (flags.length > 0) {
          this.myFlags = flags;
          flags.forEach((f: any, i: number) => {
            if (f.flagRuns.length === 0) {
              this.dashboardTilesAPIComponent.getFlagRuns(f.flagKey)
            }
          })
        }
      })
  }

  public ngOnInit(): void {

    this.route.paramMap
      .subscribe((params: ParamMap) => {
        if (this.pathId !== params.get('UserId') && this.pathId !== null) {
          this.pathId = params.get('UserId');
          console.log('this.pathId ', this.pathId)
          this.dashboardTilesAPIComponent.getActiveUser(this.pathId);
          this.dashboardTilesAPIComponent.getAnalystsFlags(this.pathId);
          this.dashboardTilesAPIComponent.getSupervisorFlags(this.pathId);
        }
      });

  }

  dragMoved(event: CdkDragMove<FlightContents>) {
    // get PosX & PosY
    console.log('dragMoved ', event)
  }


  drop(event: CdkDragDrop<any>) {
    console.log('drop ', event, ' previousIndex ', event.previousIndex, ' currentIndex ', event.currentIndex)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }

  public closeModal() {
    console.log('closeModal ', this.showEditorModal)
    this.showEditorModal = false;
  };

  public openModal() {
    console.log('openModal ', this.showEditorModal)
    this.showEditorModal = true;

    this.updateFlagRun(this.myFlags[0])
  };


  public getFlightLists(key: any, id: number): FlagRunFlights {
    return this.dashboardTilesAPIComponent.getFlightList(key, id)
  }


  public updateFlagRun(event: any) {
    console.log('event ', event.flagRuns)
    this.selectedFlagRuns = event.flagRuns;
    this.flagNameAndType = `${event.flagTypeName}: ${event.name}`
    event.flagRuns.map((r: any, e: number) => {
      this.dashboardTilesAPIComponent.allFlightList.forEach((fl, i) => {
        if (r.historyId === fl.id) {
          this.selectedFlagRuns[e].flights = fl;
          this.flightsToPass.push(fl)
        }
      })
      console.log('this.flightsToPass ', this.selectedFlagRuns)
    })
    this.dashboardTilesAPIComponent.apiFlagsRunFlight$.next(this.flightsToPass)
  }
}
