import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SortTileOptionsService } from './services/sort-tiles-options.service';
import { environment } from '../environments/environment';
import { DashboardTilesAPIComponent } from './api/dashboard-api.service';
import { AuthenticationService } from './services/authentication.service';
import { flagTypes } from './dashboard-constants';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  public currentApplicationVersion = environment.appVersion;

  public showEditorModal = false;

  public savedFlagsStatic: any[] = [];
  // Moved from Mock
  public selectedFlags: any;

  constructor(
    public sortTileOptionsService: SortTileOptionsService,
    public authenticationService: AuthenticationService,
    public dashboardTilesAPIComponent: DashboardTilesAPIComponent,
    public changeDetector: ChangeDetectorRef) {

    this.dashboardTilesAPIComponent.apiFlags$
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

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // Reorder items within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move items between lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  public selectFlagTypes(event: any) {

    //console.log('selectFlagTypes ', event, ' savedFlagsStatic ', this.savedFlagsStatic)

    this.selectedFlags = [...this.savedFlagsStatic];
    let flagListReturn: any[] = [];

    if (event.name === 'All') {
      flagListReturn = [...this.savedFlagsStatic];
      console.log('selectFlagTypes ', event, ' flagListReturn ', flagListReturn)
    } else {
      flagListReturn = this.selectedFlags.filter((flag: any) => {
        // console.log('flag ', flag.flagTypeName)
        if (flag.flagTypeName === event.name) {
          return flag
        }
      })
    }

    this.dashboardTilesAPIComponent.apiFlags$.next(flagListReturn);
    //console.log('flagListReturn) ', flagListReturn)
  }

  // from Priority Selection
  public selectSortMethod(ev: any) {

    //console.log('selectSortMethod ', ev)

    function dynamicSort(property: any) {
      //console.log('dynamicSort ', property)
      var sortOrder = 1;
      // Sort function
      return function (a: any, b: any) {
        // console.log('dynamicSort ', a, ' b ', b)
        // console.log('a ', a[property], ' b ', b[property])
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

