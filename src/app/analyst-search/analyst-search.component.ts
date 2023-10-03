import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SortTileOptionsService } from '../services/sort-tiles-options.service';
import { of, delay, Observable, BehaviorSubject } from 'rxjs';


@Component({
    selector: 'analyst-search',
    templateUrl: './analyst-search.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./analyst-search.component.scss']
})



export class AnalystSearchComponent {


    public numAnalystsSelected = false;


    constructor(public sortTileOptionsService: SortTileOptionsService) { }


    public onSelectAll() {

        let stateTest = true;

        if (this.sortTileOptionsService.selectedAnalysts.length === this.sortTileOptionsService.analystGroup.length) {
            stateTest = false;
        }

        if (this.sortTileOptionsService.selectedAnalysts.length > 0 && stateTest) {
            this.sortTileOptionsService.selectedAnalysts = [];
        }


        this.sortTileOptionsService.analystGroup.forEach((ag, i) => {
            ag.state = stateTest;

            if (stateTest) {
                this.sortTileOptionsService.selectedAnalysts.push(ag.idx);
                this.sortTileOptionsService.analystGroup[ag.idx].state = true;
            } else {
                this.sortTileOptionsService.selectedAnalysts = [];
                this.sortTileOptionsService.analystGroup[ag.idx].state = false;
            }
        })
        console.log('this.sortTileOptionsService.selectedAnalysts ', this.sortTileOptionsService.selectedAnalysts)

    }


    public clear(item: any) {
        console.log('clear', item)
    }


    public onAdd(event: any) {

        if (!this.sortTileOptionsService.selectedAnalysts.includes(event.idx)) {

            this.sortTileOptionsService.selectedAnalysts.push(event.idx)
            this.sortTileOptionsService.analystGroup[event.idx].state = true;
        } else {
            this.sortTileOptionsService.selectedAnalysts.splice(event.idx, 1)
            this.sortTileOptionsService.analystGroup[event.idx].state = false;
        }

        // console.log('AnalystSearchComponent onAdd ', this.sortTileOptionsService.selectedAnalysts)
    }

}