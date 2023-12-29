import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { environment } from '../../environments/environment';
import { DashboardTilesAPIComponent } from '../api/dashboard-api.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DashboardFacadeComponent } from '../api/dashboard-facade';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})


export class AppLayoutComponent implements OnInit {

  public pathId: any;
  public pathIdFromStorage: any;

  public currentApplicationVersion = environment.appVersion;

  public showEditorModal = false;

  public savedFlagsStatic: any[] = [];
  // Moved from Mock
  public selectedFlags: any;


  constructor(public router: Router,
    public route: ActivatedRoute,
    private dashboardFacadeComponent: DashboardFacadeComponent,
    public authenticationService: AuthenticationService,
    public dashboardTilesAPIComponent: DashboardTilesAPIComponent,
    public changeDetector: ChangeDetectorRef) {


    // this.authenticationService.isUserLoginSubject$
    //   .subscribe((user: any) => {
    //     // console.log('authenticationService Subscribed  user ', user)
    //   })

    this.dashboardFacadeComponent.apiFlags$
      .subscribe((flagResponse: any) => {
        //console.log('||||  Active Flags  ', flagResponse, ' savedFlagsStatic ', this.savedFlagsStatic)
        if (this.savedFlagsStatic.length === 0) {
          this.savedFlagsStatic = [...flagResponse];
        }
        this.selectedFlags = flagResponse;
      })

    this.dashboardTilesAPIComponent.apiAllUsers$
      .subscribe((params: any) => {
        if (params.length > 0) {
          this.dashboardTilesAPIComponent.allUsersInput = params
          // console.log('this.allUsersInput  ', this.dashboardTilesAPIComponent.allUsersInput)
        }
      })

  }

  public ngOnInit(): void {
    // this.route.paramMap
    //   .subscribe((params: ParamMap) => {
    //     if (this.pathId !== params.get('UserId') && this.pathId !== null) {
    //       this.pathId = params.get('UserId');
    //       console.log('this.pathId ', this.pathId)
    //       this.dashboardTilesAPIComponent.getActiveUser(this.pathId);
    //       this.dashboardTilesAPIComponent.getAnalystsFlags(this.pathId);
    //       this.dashboardTilesAPIComponent.getSupervisorFlags(this.pathId);
    //     }
    //   });

  }
}
