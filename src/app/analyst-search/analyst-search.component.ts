import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { SortTileOptionsService } from '../services/sort-tiles-options.service';

@Component({
    selector: 'analyst-search',
    templateUrl: './analyst-search.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./analyst-search.component.scss']
})



export class AnalystSearchComponent implements OnInit, AfterViewInit {

    public selectedAnalystImages: any[] = []
    public selectedAnalysts: any = [];

    constructor(public sortTileOptionsService: SortTileOptionsService) {
        this.selectedAnalysts = [];
    }

    public onAdd($event: any) {
        // console.log('AnalystSearchComponent onAdd ', $event)
        this.selectedAnalysts.push($event)
        // this.selectedAnalystImages.push($event.avatar)
        console.log('AnalystSearchComponent onAdd ', this.selectedAnalysts, ' images ', this.selectedAnalystImages)
    }

    public onChange(event: any) {
        // this.sortTileOptionsService.analystGroup[idx].state = !this.sortTileOptionsService.analystGroup[idx].state;
        //  console.log('AnalystSearchComponent onChange ', event)

    }

    public ngOnInit(): void {
        //console.log('AnalystSearchComponent ngOnInit ', this.sortTileOptionsService)
    }

    public ngAfterViewInit() {
        console.log('AnalystSearchComponent ngAfterViewInit ')

    }



}