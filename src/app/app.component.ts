import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PathToAssets } from './dashboard-constants';
import { SortTileOptionsService } from './services/sort-tiles-options.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //encapsulation: ViewEncapsulation.None
})


export class AppComponent implements OnInit {

  title = 'rm-flag-dashboard-ng';
  public isNdoChecked = true;
  public isThemeChange = true;
  public pathToAssets = PathToAssets;
  public chartThemeSelect = 'dark';



  constructor(public sortTileOptionsService: SortTileOptionsService) { }

  public ngOnInit(): void { }

  // public onSelectAll() {
  //   console.log('onSelectAll ')
  // }



  public getNumRoutesSelected(): boolean {
    let test = false;
    if (this.sortTileOptionsService.selectedRoutes.length === this.sortTileOptionsService.routeList.length) {
      test = true;
    }
    return test
  }


  // public onSelectAllRoutes() {

  //   let stateTest = true;


  //   if (this.sortTileOptionsService.selectedRoutes.length === this.sortTileOptionsService.routeList.length) {

  //     stateTest = false;
  //     console.log('routeList ===== ', stateTest)
  //   }

  //   if (this.sortTileOptionsService.selectedRoutes.length > 0 && stateTest) {
  //     console.log('routeList length > 0 ', stateTest)
  //     this.sortTileOptionsService.selectedRoutes = [];
  //   }



  //   this.sortTileOptionsService.routeList.forEach((ag, i) => {
  //     //  console.log('ag ', ag)
  //     ag.state = stateTest;

  //     if (stateTest) {
  //       this.sortTileOptionsService.selectedRoutes.push(ag);
  //       this.sortTileOptionsService.routeList[ag.id].state = true;
  //     } else {
  //       this.sortTileOptionsService.selectedRoutes = [];
  //       this.sortTileOptionsService.routeList[ag.id].state = false;
  //     }
  //   })
  //   console.log('routeList onSelectAll ', stateTest)
  //   this.sortTileOptionsService.routeListBehaviorSubject$.next(this.sortTileOptionsService.routeList);
  //   console.log('this.sortTileOptionsService.routeList ', this.sortTileOptionsService.routeList, ' selectedRoutes ', this.sortTileOptionsService.selectedRoutes)

  // }

  // public clear(index: any) {
  //   console.log('clear ', index)

  //   // this.selectedRoutes.splice(index, 1);

  //   // console.log('clear ', this.selectedRoutes)
  // }
}
