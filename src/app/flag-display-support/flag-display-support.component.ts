import { Component } from '@angular/core';
import { SortTileOptionsService } from '../services/sort-tiles-options.service';


@Component({
  selector: 'app-flag-display',
  templateUrl: './flag-display-support.component.html',
  styleUrls: ['./flag-display-support.component.scss']
})

export class FlagDisplaySupportComponent {

  public selectedFlagElement = 1;

  public hassSelectionBeenRegistered = false;

  constructor(public sortTileOptionsService: SortTileOptionsService) {

  }

  // // this.savedDashboard
  // public setCollectionType(id: number) {
  //   let newColl: any[] = [];

  //   this.selectedFlagElement = id;

  //   console.log('setCollectionType ')
  //   this.sortTileOptionsService.dashboard = [...this.sortTileOptionsService.savedDashboard];

  //   this.hassSelectionBeenRegistered = true;

  //   this.sortTileOptionsService.dashboard.map((cb: any) => {
  //     if (cb.priority === id) {
  //       newColl.push(cb);
  //     }
  //   })

  //   this.sortTileOptionsService.selectedFlag(newColl);
  // }


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
