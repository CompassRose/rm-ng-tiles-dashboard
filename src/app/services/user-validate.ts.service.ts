import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserValidateTsService implements OnInit {


  // From router params
  public userId: number;

  constructor(private route: ActivatedRoute) { }


  // this.showChild = false;
  public ngOnInit(): void {



    this.route.paramMap
      .subscribe((params: ParamMap) => {

        if (this.userId !== +params.get('id')) {

          if (this.pathId) {
            this.dataService.showChild = false;
          }

          this.pathId = +params.get('id');
          this.dataService.dashboardFacade.dashboardAPI.selectedMasterKey = this.pathId;
          this.selectNextFlight(this.pathId, null);
        }
      });
  }
