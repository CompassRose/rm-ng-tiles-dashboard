import { Component, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-tile-card',
  templateUrl: './tile-card.component.html',
  styleUrls: ['./tile-card.component.scss'],

})

export class TileCardComponent implements AfterViewInit {

  public dashboardTile: any;

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
    // this.flagRuns.push(item.Runs);
  }

  @Input()
  set FlagRuns(runs: any) {
    if (runs.length > 0) {
      console.log(' runs ', runs)
      this.flagRuns.push(runs);
    }
  }

  constructor() {

  }

  public ngAfterViewInit(): void {
    // console.log('  DashboardItem ', this.dashboardTile, ' flagRuns ', this.flagRuns)
  }

  public getPriorityColor(idx: number): string {

    const testColors = ['Navy', 'OrangeRed', 'DarkGreen', '#7A2B39', 'DodgerBlue', 'Red'];

    //console.log('testColors[idx] ', idx, '  -- ', testColors[idx - 1])
    return testColors[idx - 1];

  }

  public selectDropdown(index: number) {

    console.log('this.openedItem ', this.openedItem)

    if (this.openedItem !== undefined && this.openedItem !== index) {
      this.dashboardTile.showOptions = false;
    }

    this.dashboardTile.showOptions = true;

    this.openedItem = index;

    this.showOptions = !this.showOptions;

    console.log('selectDropdown ', index, ' showOptions ', this.showOptions)
  }


  public goToDestination(option: any, idx: number) {

    const myModalEl = document.getElementById('exampleModal');

    this.dashboardTile.showOptions = false;

    this.callHistoryModal.emit(this.dashboardTile);

    console.log('goToDestination ', option, ' dashboardTile ', this.dashboardTile)

  }

}
