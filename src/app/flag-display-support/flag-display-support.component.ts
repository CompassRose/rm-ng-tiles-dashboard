import { Component, OnInit } from '@angular/core';
import { SortTileOptionsService } from '../services/sort-tiles-options.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FlagsDashboardDotNetWrapper } from '../api/Flags-dashboard-Interface';

import { DashboardTilesAPIComponent } from '../api/dashboard-api.service';
@Component({
  selector: 'app-grid',
  templateUrl: './flag-display-support.component.html',
  styleUrls: ['./flag-display-support.component.scss']
})

export class FlagDisplaySupportComponent implements OnInit {

  public selectedFlagElement = 1;

  public hassSelectionBeenRegistered = false;

  // From router params
  public pathId: any;

  public activeUser: any;

  constructor(public sortTileOptionsService: SortTileOptionsService, private route: ActivatedRoute, public flagsDashboardDotNetWrapper: FlagsDashboardDotNetWrapper, public dashboardTilesAPIComponent: DashboardTilesAPIComponent) {

  }



  public ngOnInit(): void {
    console.log('ngOnInit ',)

    this.route.paramMap
      .subscribe((params: ParamMap) => {
        //console.log('params ', params)
        // @ts-ignore
        if (this.pathId !== params.get('UserId') && this.pathId !== null) {

          // @ts-ignore
          this.pathId = params.get('UserId');
          // console.log('this.pathId ', this.pathId)

          this.dashboardTilesAPIComponent.getAnalystsFlags(this.pathId)
          this.dashboardTilesAPIComponent.getSupervisorFlags(this.pathId)
          this.dashboardTilesAPIComponent.getActiveUser(this.pathId)


        }
      });

  }



  public getCollectionLength(id: number): number {

    // console.log('getCollectionLength ', id)

    let counter = 0;

    this.sortTileOptionsService.savedDashboard.map((cb: any) => {
      if (cb.priority === id) {
        counter += 1;
      }
    })
    // console.log('counter ', counter)
    return counter
  }

  public resetCollectionType() {
    this.hassSelectionBeenRegistered = false;
    this.sortTileOptionsService.dashboard = [...this.sortTileOptionsService.savedDashboard];
  }

  public getNumRoutesSelected(): boolean {
    let test = false;
    if (this.sortTileOptionsService.selectedRoutes.length === this.sortTileOptionsService.routeList.length) {
      test = true;
    }
    return test
  }
}
