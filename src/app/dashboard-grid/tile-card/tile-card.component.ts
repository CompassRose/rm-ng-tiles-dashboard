import { Component, Input, Output, EventEmitter } from '@angular/core';
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

export class TileCardComponent {

  public dashboardTile: any;

  public selectionOptions: any[] = [
    { idx: 0, name: 'View History' },
    { idx: 1, name: 'Go to Rule' }
  ];

  public openedItem: number;
  public showOptions = false;

  @Output()
  public callHistoryModal: EventEmitter<any> = new EventEmitter();

  @Input()
  set DashboardItem(item: any) {


    this.dashboardTile = item;
    // console.log('  DashboardItem ', this.dashboardTile)
  }

  constructor() { }


  public selectDropdown(index: number) {

    // console.log('this.openedItem ', this.openedItem)

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
