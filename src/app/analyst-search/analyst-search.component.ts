import { Component, Input } from '@angular/core';
import { UserModel, ApiUserModel } from '../models/tiles.model';
import { DashboardTilesAPIComponent } from '../api/dashboard-api.service';

@Component({
    selector: 'analyst-search',
    templateUrl: './analyst-search.component.html',
    //encapsulation: ViewEncapsulation.None,
    styleUrls: ['./analyst-search.component.scss']
})



export class AnalystSearchComponent {

    public myAllUserList: ApiUserModel[] = [];

    @Input()
    set AllUsers(items: UserModel[]) {
        this.myAllUserList = items;
    }

    public userSelectAllState = false;

    public selectedUsersBySupervisor: any[] = [];

    constructor(public dashboardTilesAPIComponent: DashboardTilesAPIComponent) {

        this.dashboardTilesAPIComponent.apiAllUsers$
            .subscribe((params: any) => {

                if (params.length > 0) {
                    params.map((u: any) => {
                        const result = u.fullName.split(/(?=[A-Z])/);
                        //console.log('trim  ', u.fullName.replace(/([A-Z])/g, ' $1').trim());
                        u.lastName = result[result.length - 1];
                        u.firstName = result[0]
                        console.log('         result  ', result.length, ' Name ', u.firstName, u.lastName)
                        this.myAllUserList.push(u)

                    })
                    console.log('||||||||||||||  this.myAllUserList ', this.myAllUserList)
                }
            })
    }


    public getNumAnalystsSelected(): boolean {

        // console.log('getNumAnalystsSelected ', this.myAllUserList)
        let test = false;
        this.myAllUserList.forEach((aUser: UserModel) => {

        })
        return test
    }

    public onSelectAll() {

        let stateTest: boolean;

        this.userSelectAllState = !this.userSelectAllState;


        // if (this.mockTileService.selectedUsersBySupervisor.length === this.allUserList.length) {
        //     stateTest = false;
        // } else {
        //     stateTest = true;
        // }

        // console.log('ag ', ' stateTest ', this.userSelectAllState)

        if (!this.userSelectAllState) {

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

    }


    public clear(item: any) {
        console.log('clear', item)
    }


    public onAdd(event: any) {

        console.log(' -------onAdd ', ' idx ', event)

        this.myAllUserList[event].state = !this.myAllUserList[event].state;

        const elementOrder = this.selectedUsersBySupervisor.findIndex(fi => {
            return fi === event;
        })

        console.log('\n\n --this.selectedUsersBySupervisor', elementOrder, ' state ', this.myAllUserList[event].state, ' -----  ', this.selectedUsersBySupervisor[elementOrder])

        if (this.selectedUsersBySupervisor.includes(event) && !this.myAllUserList[event].state) {

            this.selectedUsersBySupervisor.splice(elementOrder, 1)
        } else {
            this.selectedUsersBySupervisor.push(event)
        }



        console.log('\n\n -.selectedUsersBySupervisor ', this.selectedUsersBySupervisor)

    }
}