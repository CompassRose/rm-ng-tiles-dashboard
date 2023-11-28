import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SortTileOptionsService } from './services/sort-tiles-options.service';
import { environment } from '../environments/environment';
import { DashboardTilesAPIComponent } from './api/dashboard-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {


  public hassSelectionBeenRegistered = false;

  public FullName: string = '';

  public UserId: string = '';

  public UserType: string = '';

  public IsSupervisor = false;

  public isLoggedIn = false;

  public currentApplicationVersion = environment.appVersion;

  public allUsersInput: any[] = [];

  public pathId: any;

  public screenState = false;

  public showEditorModal = false;

  constructor(
    public sortTileOptionsService: SortTileOptionsService,
    public dashboardTilesAPIComponent: DashboardTilesAPIComponent,
    public changeDetector: ChangeDetectorRef) {

    this.dashboardTilesAPIComponent.apiAllUsers$
      .subscribe((params: any) => {
        if (params.length > 0) {
          this.dashboardTilesAPIComponent.allUsersInput = params
          //console.log('this.allUsersInput  ', this.dashboardTilesAPIComponent.allUsersInput)
        }

      })
  }


  // From label cross in selected flag type
  public clear(item: any) {

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


  public openAvatarModal(option: any, idx: number) {
    const myModalEl = document.getElementById('exampleModal');
    //console.log('goToDestination ', option);
  }


}

