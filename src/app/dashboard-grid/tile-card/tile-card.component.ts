import { Component, Input, Output, EventEmitter } from '@angular/core';


import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';


import { DashboardTilesAPIComponent } from 'src/app/api/dashboard-api.service';
import { FlagRunDev, FlagRunFlights } from 'src/app/models/tiles.model';
import { DashboardFacadeComponent } from 'src/app/api/dashboard-facade';

@Component({
  selector: 'app-tile-card',
  templateUrl: './tile-card.component.html',
  styleUrls: ['./tile-card.component.scss'],

})

export class TileCardComponent {

  public dashboardTile: any;

  public selectionOptions: any[] = [
    { idx: 0, name: 'View History' },
    { idx: 1, name: 'Go to Overview' }
  ];

  //public showHistoryModal = false;
  public activeModal: number;
  public openedItem: number;
  public showOptions = false;

  public flagRuns: any[] = [];
  //public showEditorModal = false;

  public flagNameAndType = '';
  //public selectedFlagRuns: FlagRunDev[] = [];

  @Output()
  public callHistoryModal: EventEmitter<any> = new EventEmitter();


  @Input()
  set DashboardItem(item: any) {
    console.log('item ', item)
    this.dashboardTile = item;
  }

  constructor(public dashboardTilesAPIComponent: DashboardTilesAPIComponent) { }


  public selectDropdown() {
    this.showOptions = !this.showOptions;
  }

  public getPriorityColor(idx: number): string {
    const testColors = ['Navy', 'OrangeRed', 'Green', 'DarkGreen', 'DodgerBlue', 'Red', 'Purple', 'MediumSeaGreen', 'Peru'];
    return testColors[idx - 1];
  }

  public sendFlightsToOverview(tile: any) {
    let latestRun: any = {};
    let maxValue = Math.max.apply(null,
      tile.flagRuns.map((o: any) => { return o.historyId; }))
    console.log('TILES allFlightList ', this.dashboardTilesAPIComponent.allFlightList)
    this.dashboardTilesAPIComponent.allFlightList.forEach((fl, i) => {

      if (maxValue === fl.id) {
        latestRun = fl;
      }
    })

    console.log('Flights to send pre-stringify ', tile, '\n\n');
    const flightString = JSON.stringify(latestRun.value);
    this.dashboardTilesAPIComponent.toOverviewWithFlightString(flightString, tile.flagKey)
  }


  public goToDestination(option: any, tile: any) {
    this.showOptions = false;

    if (option === 0) {
      this.callHistoryModal.emit(this.dashboardTile);
    } else {
      this.sendFlightsToOverview(this.dashboardTile)
    }
  }
}
