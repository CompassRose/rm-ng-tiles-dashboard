import { Component, Input, Output, EventEmitter } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { DashboardTilesAPIComponent } from 'src/app/api/dashboard-api.service';

@Component({
  selector: 'app-tile-card',
  templateUrl: './tile-card.component.html',
  styleUrls: ['./tile-card.component.scss'],

})

export class TileCardComponent {

  public dashboardTile: any;
  public showHistoryModal = false;


  public selectionOptions: any[] = [
    { idx: 0, name: 'View History' },
    { idx: 1, name: 'Go to Overview' }
  ];


  public openedItem: number;
  public showOptions = false;
  public flagRuns: any[] = [];


  @Output()
  public callHistoryModal: EventEmitter<any> = new EventEmitter();


  @Input()
  set DashboardItem(item: any) {
    console.log('item ', item)
    this.dashboardTile = item;
  }


  @Input()
  set FlagRuns(runs: any) {
    if (runs.length > 0) {
      console.log(' @Input this.flagRuns ', this.flagRuns)
      // this.flagRuns.push(runs);
    }
  }


  constructor(public dashboardTilesAPIComponent: DashboardTilesAPIComponent) { }



  public getPriorityColor(idx: number): string {
    const testColors = ['Navy', 'OrangeRed', 'DarkGreen', 'YellowGreen', 'DodgerBlue', 'Red', 'Purple', 'MediumSeaGreen', 'Peru'];
    return testColors[idx - 1];
  }


  public selectDropdown() {
    this.showOptions = !this.showOptions;
    //console.log('selectDropdown ', ' showOptions ', this.showOptions)
  }



  public sendFlightsToOverview(tile: any) {

    let latestRun: any = {};

    let maxValue = Math.max.apply(null,
      tile.flagRuns.map((o: any) => { return o.historyId; }))

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

    console.log('goToDestination  All option ', option, ' tile ', tile)

    this.showOptions = false;

    if (option === 0) {
      this.callHistoryModal.emit(this.dashboardTile);
    } else {
      this.sendFlightsToOverview(this.dashboardTile)
    }


    //console.log('goToDestination ', option, ' dashboardTile ', this.dashboardTile)

  }

}
