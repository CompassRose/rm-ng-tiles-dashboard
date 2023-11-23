import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PathToAssets } from './dashboard-constants';
import { SortTileOptionsService } from './services/sort-tiles-options.service';
import { MockService } from './services/tiles-mock-api';
import { environment } from '../environments/environment';
import { DashboardTilesAPIComponent } from './api/dashboard-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {


  public hassSelectionBeenRegistered = false;

  public FullName: string = '';

  public UserId: string = '';

  public UserType: string = '';

  public IsSupervisor = false;

  public isLoggedIn = false;

  public currentApplicationVersion = environment.appVersion;

  public allUsersInput: any[] = [];


  constructor(
    public router: Router,
    public sortTileOptionsService: SortTileOptionsService,
    public mockTileService: MockService,
    public dashboardTilesAPIComponent: DashboardTilesAPIComponent,
    public changeDetector: ChangeDetectorRef) {

    this.dashboardTilesAPIComponent.apiAllUsers$
      .subscribe((params: any) => {
        if (params.length > 0) {
          this.dashboardTilesAPIComponent.allUsersInput = params
          //console.log('this.allUsersInput  ', this.dashboardTilesAPIComponent.allUsersInput)
        }

      })

    // this.dashboardTilesAPIComponent.apiFlagChartData$
    //   .subscribe((values: any) => {
    //     if (values) {
    //       console.log('apiFlagChartData$ ', values)
    //     }

    //   })

    this.mockTileService.apiPrioritiesSubject$.subscribe((res: any) => {
      if (res.length > 0) {
        //  console.log('apiPrioritiesSubject ', res)
      }
    })


  }


  public ngOnInit(): void {
    this.mockTileService.loadConfiguration('mock-priorities');
  }

  // From label cross in selected flag type
  public clear(item: any) {
    //this.mockTileService.selectFlagTypes(item)
  }


  public openAvatarModal(option: any, idx: number) {
    const myModalEl = document.getElementById('exampleModal');
    //console.log('goToDestination ', option);
  }


}

