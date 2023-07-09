
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PathToAssets } from '../dashboard-constants';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';

@Injectable({
    providedIn: 'root',
})


export class SortTileOptionsService {

    public dashboard: Array<GridsterItem>;
    public isNdoChecked = true;
    public isThemeChange = true;
    public chartThemeSelect = 'dark';
    public selectedItems: any[] = [];
    public priorityItems: any[] = [];
    public selectedPriority: number = 0;

    public dropdownListBehaviorSubject$ = new BehaviorSubject<any[]>([]);
    public priorityListBehaviorSubject$ = new BehaviorSubject<any[]>([]);

    public dropdownList: any[] = [];



    public analystGroup = [
        {
            name: "Guy Hawkins",
            title: 'Senior Analyst',
            state: false,
            avatar: '../assets/images/analyst01.png'
        },
        {
            name: "Franklin Webb",
            title: 'Junior Analyst',
            state: true,
            avatar: '../assets/images/analyst02.png'
        },
        {
            name: "John Anderson",
            title: 'Junior Analyst',
            state: false,
            avatar: '../assets/images/analyst03.png'
        },
        {
            name: "Willie Smish",
            title: 'Senior Analyst',
            state: false,
            avatar: '../assets/images/analyst04.png'
        },
        {
            name: "Peter Johnson",
            title: 'Senior Analyst',
            state: false,
            avatar: '../assets/images/analyst05.png'
        },
        {
            name: "Guy Hawkins",
            title: 'Senior Analyst',
            state: false,
            avatar: '../assets/images/analyst01.png'
        },
        {
            name: "Franklin Webb",
            title: 'Junior Analyst',
            state: true,
            avatar: '../assets/images/analyst02.png'
        },
        {
            name: "John Anderson",
            title: 'Junior Analyst',
            state: true,
            avatar: '../assets/images/analyst03.png'
        },
        {
            name: "Willie Smish",
            title: 'Senior Analyst',
            state: false,
            avatar: '../assets/images/analyst04.png'
        },
        {
            name: "Peter Johnson",
            title: 'Senior Analyst',
            state: true,
            avatar: '../assets/images/analyst05.png'
        },
    ]

    public selectedAnalysts = [0]


    constructor() {


        this.dashboard = [
            { idx: 0, cols: 1, rows: 1, y: 0, x: 0, color: 'Brown', name: 'Title', priority: 1, reviewed: true },
            { idx: 1, cols: 1, rows: 1, y: 0, x: 1, color: 'navy', name: 'Title', priority: 1, reviewed: true },
            { idx: 2, cols: 1, rows: 1, y: 0, x: 2, color: 'DarkGreen', name: 'Title', priority: 1, reviewed: true },
            { idx: 3, cols: 1, rows: 1, y: 0, x: 3, color: 'DarkBlue', name: 'Title', priority: 1, reviewed: true },
            { idx: 4, cols: 1, rows: 1, y: 0, x: 4, color: 'Brown', name: 'Title', priority: 2, reviewed: false },
            { idx: 5, cols: 1, rows: 1, y: 1, x: 0, color: 'DarkGreen', name: 'Title', priority: 2, reviewed: true },
            { idx: 6, cols: 1, rows: 1, y: 1, x: 1, color: 'DarkSlateGrey', name: 'Title', priority: 2, reviewed: true },
            { idx: 7, cols: 1, rows: 1, y: 1, x: 2, color: 'DarkRed', name: 'Title', priority: 2, reviewed: true },
            { idx: 8, cols: 1, rows: 1, y: 1, x: 3, color: 'purple', name: 'Title', priority: 3, reviewed: true },
            { idx: 9, cols: 1, rows: 1, y: 2, x: 0, color: 'DarkGreen', name: 'Title', priority: 3, reviewed: false },
            { idx: 10, cols: 1, rows: 1, y: 2, x: 1, color: 'DarkSlateGrey', name: 'Title', priority: 3, reviewed: false },
            { idx: 11, cols: 1, rows: 1, y: 2, x: 2, color: 'navy', name: 'Title', priority: 3, reviewed: false },
            { idx: 12, cols: 1, rows: 1, y: 2, x: 3, color: 'Indigo', name: 'Title', priority: 4, reviewed: true },
            { idx: 13, cols: 1, rows: 1, y: 3, x: 0, color: 'DarkBlue', name: 'Title', priority: 4, reviewed: true }
        ];

        this.priorityItems = [
            { id: 0, name: 'Priority' },
            { id: 1, name: 'Last Run' },
            { id: 2, name: 'Reviewed' }
        ];

        this.selectedPriority = 0;

        this.dropdownList = [
            { id: 1, name: 'LGN - PMI', state: true },
            { id: 2, name: 'LTN - PMI', state: false },
            { id: 3, name: 'LGW - PMI', state: false },
            { id: 4, name: 'PMI - LTN', state: false },
            { id: 5, name: 'STN - PMI', state: false }
        ];
        this.selectedItems = [
            { id: 3, name: 'LGW - PMI' },
        ];

        this.priorityListBehaviorSubject$.next(this.priorityItems)

        this.dropdownListBehaviorSubject$.next(this.dropdownList)

        this.priorityListBehaviorSubject$
            .subscribe((res) => {
                // console.log('res ', res)
            })
    }


    public selectSortMethod(ev: any) {
        console.log('selectSortMethod ', ev)

    }


    // On Theme change Dark/Light
    public onThemeChange(scheme: any) {

        this.chartThemeSelect = this.isThemeChange ? 'dark' : 'light';
        console.log('onThemeChange ', this.chartThemeSelect, ' isThemeChange ', this.isThemeChange)
    }

    public addItem(): void {
        // this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
    }

    public selectAnalysts(event: any) {
        console.log('selectAnalysts ', event)
        // this.selectedAnalysts
    }

    public selectYearlyElement(idx: number) {

        console.log('selectYearlyElement ', idx)
        if (!this.selectedAnalysts.includes(idx)) {
            this.selectedAnalysts.push(idx);
        }
        this.analystGroup[idx].state = !this.analystGroup[idx].state;
        this.selectedAnalysts[idx]
        console.log('this.selectedAnalysts ', this.selectedAnalysts)
    }

    public onNdoSelect(event: any) {
        console.log('onNdoSelect ', event)
    }

    public onNdoDeSelect(event: any) {
        console.log('onNdoDeSelect ', event)
    }

}