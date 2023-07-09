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

  // public dropdownListBehaviorSubject$ = new BehaviorSubject<any[]>([]);
  // public priorityListBehaviorSubject$ = new BehaviorSubject<any[]>([]);

  //public dropdownList: any[] = [];

  constructor(public sortTileOptionsService: SortTileOptionsService) {

    // this.priorityItems = [
    //   { id: 0, name: 'Priority' },
    //   { id: 1, name: 'Last Run' },
    //   { id: 2, name: 'Reviewed' }
    // ];

    // this.selectedPriority = 0;
  }

  public ngOnInit(): void {

    // this.dropdownList = [
    //   { item_id: 1, item_text: 'LGN - PMI' },
    //   { item_id: 2, item_text: 'LTN - PMI' },
    //   { item_id: 3, item_text: 'LGW - PMI' },
    //   { item_id: 4, item_text: 'PMI - LTN' },
    //   { item_id: 5, item_text: 'STN - PMI' }
    // ];


    // this.selectedItems = [
    //   { item_id: 3, item_text: 'LGW - PMI' },
    // ];

    // this.priorityListBehaviorSubject$.next(this.priorityItems)

    // this.dropdownListBehaviorSubject$.next(this.dropdownList)

    // this.priorityListBehaviorSubject$
    //   .subscribe((res) => {
    //     console.log('res ', res)
    //   })
  }

  // public analystGroup = [
  //   {
  //     name: "Guy Hawkins",
  //     title: 'Senior Analyst',
  //     state: true,
  //     avatar: '../assets/images/analyst01.png'
  //   },
  //   {
  //     name: "Franklin Webb",
  //     title: 'Junior Analyst',
  //     state: true,
  //     avatar: '../assets/images/analyst02.png'
  //   },
  //   {
  //     name: "John Anderson",
  //     title: 'Junior Analyst',
  //     state: true,
  //     avatar: '../assets/images/analyst03.png'
  //   },
  //   {
  //     name: "Willie Smish",
  //     title: 'Senior Analyst',
  //     state: true,
  //     avatar: '../assets/images/analyst04.png'
  //   },
  //   {
  //     name: "Peter Johnson",
  //     title: 'Senior Analyst',
  //     state: true,
  //     avatar: '../assets/images/analyst05.png'
  //   },
  //   {
  //     name: "Guy Hawkins",
  //     title: 'Senior Analyst',
  //     state: true,
  //     avatar: '../assets/images/analyst01.png'
  //   },
  //   {
  //     name: "Franklin Webb",
  //     title: 'Junior Analyst',
  //     state: true,
  //     avatar: '../assets/images/analyst02.png'
  //   },
  //   {
  //     name: "John Anderson",
  //     title: 'Junior Analyst',
  //     state: true,
  //     avatar: '../assets/images/analyst03.png'
  //   },
  //   {
  //     name: "Willie Smish",
  //     title: 'Senior Analyst',
  //     state: true,
  //     avatar: '../assets/images/analyst04.png'
  //   },
  //   {
  //     name: "Peter Johnson",
  //     title: 'Senior Analyst',
  //     state: true,
  //     avatar: '../assets/images/analyst05.png'
  //   },
  // ]

  // public selectedAnalysts = [
  //   {
  //     name: "Guy Hawkins",
  //     title: 'Senior Analyst',
  //     state: true,
  //     avatar: '../assets/images/analyst01.png'
  //   },
  //   {
  //     name: "Franklin Webb",
  //     title: 'Junior Analyst',
  //     state: false,
  //     avatar: '../assets/images/analyst02.png'
  //   },
  //   {
  //     name: "John Anderson",
  //     title: 'Junior Analyst',
  //     state: false,
  //     avatar: '../assets/images/analyst03.png'
  //   },
  //   {
  //     name: "Willie Smish",
  //     title: 'Senior Analyst',
  //     state: true,
  //     avatar: '../assets/images/analyst04.png'
  //   },
  //   {
  //     name: "Peter Johnson",
  //     title: 'Senior Analyst',
  //     state: false,
  //     avatar: '../assets/images/analyst05.png'
  //   },
  //   {
  //     name: "Guy Hawkins",
  //     title: 'Senior Analyst',
  //     state: false,
  //     avatar: '../assets/images/analyst04.png'
  //   },
  //   {
  //     name: "Franklin Webb",
  //     title: 'Junior Analyst',
  //     state: true,
  //     avatar: '../assets/images/analyst02.png'
  //   },
  //   {
  //     name: "John Anderson",
  //     title: 'Junior Analyst',
  //     state: false,
  //     avatar: '../assets/images/analyst03.png'
  //   },
  //   {
  //     name: "Kent McFall",
  //     title: 'Senior Analyst',
  //     state: false,
  //     avatar: '../assets/images/analyst03.png'
  //   },
  //   {
  //     name: "Peter Johnson",
  //     title: 'Senior Analyst',
  //     state: false,
  //     avatar: '../assets/images/analyst05.png'
  //   }
  // ]

  // public selectSortMethod(idx: any) {
  //   console.log('selectSortMethod ', idx)

  // }


  // // On Theme change Dark/Light
  // onThemeChange(scheme: any) {

  //   this.chartThemeSelect = this.isThemeChange ? 'dark' : 'light';
  //   console.log('onThemeChange ', this.chartThemeSelect, ' isThemeChange ', this.isThemeChange)
  // }

  // public addItem(): void {
  //   // this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  // }

  // public selectKpiElement(event: any) {
  //   console.log('selectKpiElement ', event)
  // }

  // public selectYearlyElement(idx: number) {

  //   console.log('selectYearlyElement ', idx)
  //   this.selectedAnalysts[idx].state = !this.selectedAnalysts[idx].state

  // }

  // public onNdoSelect(event: any) {
  //   console.log('onNdoSelect ', event)
  // }
  // public onNdoDeSelect(event: any) {
  //   console.log('onNdoDeSelect ', event)
  // }
}
