import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { environment } from '../environments/environment';
import { DashboardTilesAPIComponent } from './api/dashboard-api.service';
import { AuthenticationService } from './services/authentication.service';
import { flagTypes } from './dashboard-constants';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DashboardFacadeComponent } from './api/dashboard-facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  public currentApplicationVersion = environment.appVersion;

  public showEditorModal = false;

  public savedFlagsStatic: any[] = [];
  // Moved from Mock
  public selectedFlags: any;

  public pathId: any;
  public pathIdFromStorage: any;

  public timelineOrGrid = 0;

  constructor(
    public router: Router,
    public route: ActivatedRoute,

    public dashboardFacadeComponent: DashboardFacadeComponent,
    public authenticationService: AuthenticationService,
    public dashboardTilesAPIComponent: DashboardTilesAPIComponent,
    public changeDetector: ChangeDetectorRef) {


    //console.log(' ???? ', window.localStorage.getItem('currentUser'));

    window.localStorage.setItem('currentUserString', 'RMSTEST');

    this.pathIdFromStorage = window.localStorage.getItem('currentUserString')

    this.authenticationService.isUserLoginSubject$
      .subscribe((user: any) => {
        if (user !== null) {
          this.pathId = user.userId;
          const returnFlags = async () => {
            const a = await this.dashboardTilesAPIComponent.getAnalystsFlags(this.pathId);
            this.dashboardFacadeComponent.apiFlags$.next(a);
          };

          returnFlags()

          this.dashboardTilesAPIComponent.getSupervisorFlags(this.pathId);
          setTimeout(() => {
            this.timelineOrGrid = 1;
            this.router.navigate(['/market-study']);
          }, 100);

        }
      })


    this.dashboardFacadeComponent.apiFlags$
      .subscribe((flagResponse: any) => {
        if (this.savedFlagsStatic.length === 0) {
          this.savedFlagsStatic = [...flagResponse];
        }
        this.selectedFlags = flagResponse;
      })

    this.dashboardTilesAPIComponent.apiAllUsers$
      .subscribe((params: any) => {
        if (params.length > 0) {
          this.dashboardTilesAPIComponent.allUsersInput = params
        }
      })
  }



  public ngOnInit(): void {

    this.route.paramMap
      .subscribe((params: ParamMap) => {

        console.log('this.pathIdFromStorage ', this.pathIdFromStorage)

        if (window.localStorage.getItem('currentUser') !== null) {
          this.pathId = this.pathIdFromStorage;
        } else {
          this.pathId = this.pathIdFromStorage;
        }
        this.dashboardTilesAPIComponent.getActiveUser(this.pathId);
      });

    this.timelineOrGrid = 1;
    this.router.navigate(['/market-study']);
  }





  public selectFlagTypes(event: any) {

    this.selectedFlags = [...this.savedFlagsStatic];
    let flagListReturn: any[] = [];

    if (event.name === 'All') {
      flagListReturn = [...this.savedFlagsStatic];
    } else {
      flagListReturn = this.selectedFlags.filter((flag: any) => {
        if (flag.flagTypeName === event.name) {
          return flag
        }
      })
    }

    this.dashboardFacadeComponent.apiFlags$.next(flagListReturn);
    //console.log('flagListReturn) ', flagListReturn)
  }

  public backToTiles() {
    console.log('backToTiles')
    this.router.navigate(['/tiles-grid']);
  }



  public gotoTimeline() {

    this.timelineOrGrid++;

    if (this.timelineOrGrid === 3) {
      this.timelineOrGrid = 0;
    }

    if (this.timelineOrGrid === 0) {
      this.router.navigate(['/tiles-grid']);
    }

    if (this.timelineOrGrid === 1) {
      this.router.navigate(['/market-study']);
    }


    if (this.timelineOrGrid === 2) {
      this.router.navigate(['/dimension-bar']);
    }

    console.log('gotoTimeline ', this.timelineOrGrid)
  }


  // from Priority Selection
  public selectSortMethod(ev: any) {

    //console.log('selectSortMethod ', ev)

    function dynamicSort(property: any) {
      var sortOrder = 1;
      // Sort function
      return function (a: any, b: any) {
        let result;
        if (typeof a[property] == 'boolean') {
          result = (a[property] > b[property]) ? -1 : (a[property] > b[property]) ? 0 : 1;
        } else {
          result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        }
        return result * sortOrder;
      }
    }
    this.selectedFlags.sort(dynamicSort(ev.metric));
  }

  // From label cross in selected flag type
  public clear(item: any) {
    console.log('on clear ', item)
  }


  public closeModal() {
    console.log('closeModal')
    this.showEditorModal = false;
  };

  public openModal() {
    console.log('openModal')
    this.showEditorModal = true;
  };


  public gotToEditor(state: Boolean) {

  }

}

