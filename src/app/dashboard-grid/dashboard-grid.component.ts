import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { myGridOptions } from '../../assets/gridster-options';
import { SortTileOptionsService } from '../services/sort-tiles-options.service';

import { GridsterConfig, GridsterItem } from 'angular-gridster2';


@Component({
  selector: 'app-dashboard-grid',
  templateUrl: './dashboard-grid.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dashboard-grid.component.scss']
})



export class DashboardGridComponent implements OnInit {

  public options: GridsterConfig = myGridOptions;
  public dashboard: Array<GridsterItem>;
  public dashboardCollection: any[] = [];

  constructor(public sortTileOptionsService: SortTileOptionsService) { }

  public ngOnInit(): void {
    this.dashboardCollection.push(this.sortTileOptionsService.dashboard);
  }


  saveDashboard() {
    window.localStorage.setItem('savedDashboard', JSON.stringify(this.sortTileOptionsService.dashboard));
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      console.log('Dashboard ', this.sortTileOptionsService.dashboard)
      this.options.api.optionsChanged();
    }
  }

  removeItem(item: any): void {
    this.dashboard.splice(this.sortTileOptionsService.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    this.sortTileOptionsService.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  }


}
