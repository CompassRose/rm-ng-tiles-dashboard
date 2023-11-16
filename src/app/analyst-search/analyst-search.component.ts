import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SortTileOptionsService } from '../services/sort-tiles-options.service';
import { of, delay, Observable, BehaviorSubject } from 'rxjs';
import { MockService } from '../services/tiles-mock-api';
import { UserModel } from '../models/tiles.model';

@Component({
    selector: 'analyst-search',
    templateUrl: './analyst-search.component.html',
    //encapsulation: ViewEncapsulation.None,
    styleUrls: ['./analyst-search.component.scss']
})



export class AnalystSearchComponent implements OnInit {

    public userSelectAllState = false;

    //public allUserList: UserModel[] = [];
    //  public selectedUsers: UserModel[] = [];

    constructor(public sortTileOptionsService: SortTileOptionsService, public mockTileService: MockService) {
    }

    public ngOnInit(): void {
        // this.onSelectAll()
    }



    public onSelectAll() {

        let stateTest: boolean;

        this.userSelectAllState = !this.userSelectAllState;

        console.log('ag ', ' stateTest  length ', this.mockTileService.selectedUsersBySupervisor.length)

        // if (this.mockTileService.selectedUsersBySupervisor.length === this.allUserList.length) {
        //     stateTest = false;
        // } else {
        //     stateTest = true;
        // }

        console.log('ag ', ' stateTest ', this.userSelectAllState)

        if (!this.userSelectAllState) {
            this.mockTileService.selectedUsersBySupervisor = [];
        }

        // this.mockTileService.allUserList.map((ag, i) => {

        //     ag.state = this.userSelectAllState;

        //     if (this.userSelectAllState) {
        //         this.mockTileService.selectedUsersBySupervisor.push(i);
        //     }
        //     console.log(' idx ', ag.state)
        //     return ag;
        // })


        //  this.mockTileService.apiUsersSubject$.next(this.mockTileService.allUserList);
        console.log('this.sortTileOptionsService.selectedAnalysts ', this.mockTileService.allUserList, ' \n this.mockTileService.selectedUsersBySupervisor ', this.mockTileService.selectedUsersBySupervisor)

    }


    public clear(item: any) {
        console.log('clear', item)
    }


    public onAdd(event: any) {
        console.log(' -------onAdd ', ' idx ', event)

        // const elementOrder = this.mockTileService.allUserList.findIndex(fi => {
        //     return fi.idx === event;
        // })

        // if (this.mockTileService.allUserList[event].state) {
        //     this.mockTileService.allUserList[event].state = false;
        // } else {
        //     this.mockTileService.allUserList[event].state = true;
        // }
        // //  this.mockTileService.selectedUsersBySupervisor = []
        // // console.log('\n\n --this.mockTileService.selectedUsersBySupervisor', this.mockTileService.allUserList[event])

        // this.mockTileService.allUserList.forEach((user: UserModel, i: number) => {


        //     if (user.state) {
        //         this.mockTileService.selectedUsersBySupervisor.push(i)
        //     } else {
        //         this.mockTileService.selectedUsersBySupervisor.splice(i, 1)
        //     }
        // })


    }
}