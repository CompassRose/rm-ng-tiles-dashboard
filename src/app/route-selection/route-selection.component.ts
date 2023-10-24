import { Component } from '@angular/core';
import { SortTileOptionsService } from '../services/sort-tiles-options.service';


@Component({
  selector: 'route-selection',
  templateUrl: './route-selection.component.html',
  styleUrls: ['./route-selection.component.scss']
})


export class RouteSelectionComponent {

  constructor(public sortTileOptionsService: SortTileOptionsService) {

  }


  public getNumRoutesSelected(): boolean {
    let numRoutes = false;
    if (this.sortTileOptionsService.selectedRoutes.length === this.sortTileOptionsService.routeList.length) {
      numRoutes = true;
    }
    return numRoutes
  }
}
