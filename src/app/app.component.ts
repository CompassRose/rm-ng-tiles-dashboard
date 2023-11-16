import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PathToAssets } from './dashboard-constants';
import { SortTileOptionsService } from './services/sort-tiles-options.service';
import { CommonService } from './services/image-support';
import { MockService } from './services/tiles-mock-api';
import { environment } from '../environments/environment';
import { DashboardTilesAPIComponent } from './api/dashboard-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {

  public pathToAssets = PathToAssets;

  public selectedFlagElement = 1;

  public avatarImage: any;

  public hassSelectionBeenRegistered = false;

  public userInfo = false;

  public iconFile: string = '';

  public FullName: string = '';

  public UserId: string = '';

  public UserType: string = '';

  public IsSupervisor = false;

  public isLoggedIn = false;

  public currentApplicationVersion = environment.appVersion;



  constructor(
    public router: Router,
    public sortTileOptionsService: SortTileOptionsService,
    public imageService: CommonService,
    public mockTileService: MockService,
    public dashboardTilesAPIComponent: DashboardTilesAPIComponent,
    public changeDetector: ChangeDetectorRef) {

    this.mockTileService.apiUsersSubject$.subscribe((res: any) => {
      if (res.length > 0) {
        //onsole.log('apiUsersSubject ', res)
      }

    })


    this.mockTileService.apiFlagsSubject$.subscribe((res: any) => {
      if (res.length > 0) {
        //  console.log('apiFlagsSubject ', res)

        // this.mockTileService.selectedFlags = res;

      }
    })



    this.mockTileService.apiPrioritiesSubject$.subscribe((res: any) => {
      if (res.length > 0) {
        // console.log('apiPrioritiesSubject ', res)
      }
    })


    this.imageService.editedImage$
      .subscribe((image: HTMLImageElement) => {
        //console.log('Edited image ', image)
      })


    this.imageService.imageValue$
      .subscribe((image) => {
        if (image !== null) {
          const img = new Image();
          // @ts-ignore
          img.src = image;
          this.iconFile = image;
          setTimeout(() => {
            this.imageService.editedImage$.next(img);
            this.userInfo = true;
          }, 100);
        } else {
          this.userInfo = false;
        }
      })

  }


  public ngOnInit(): void {

    let editedmageData: any;

    this.mockTileService.loadConfiguration('mock-flags');
    this.mockTileService.loadConfiguration('mock-users');
    this.mockTileService.loadConfiguration('mock-priorities');


    // @ts-ignore
    if (window.localStorage.getItem('tiles-profile')) {

      editedmageData = window.localStorage.getItem('tiles-profile');
      const loginInfo = JSON.parse(editedmageData)
      this.mockTileService.userLoggedInSubject$.next(loginInfo)
      this.FullName = loginInfo.FullName;
      this.UserId = loginInfo.UserId;
      this.IsSupervisor = loginInfo.IsSupervisor;
      this.UserType = loginInfo.UserType;
      this.userInfo = true;
    }

  }


  // From label cross in selected flag type
  public clear(item: any) {
    this.mockTileService.selectFlagTypes(item)
  }


  public openAvatarModal(option: any, idx: number) {
    const myModalEl = document.getElementById('exampleModal');
    //console.log('goToDestination ', option);
  }




  public gottoAvatarScreen(clear: boolean) {

    // this.router.navigate(['/avatar-screen']);
    if (clear) {
      localStorage.removeItem("tiles-profile");
      //this.mockTileService.userLoggedInSubject$.complete();
      this.FullName = '';
      this.UserId = '';
      this.IsSupervisor = false;
      this.UserType = '';

    }

    this.router.navigate(['/profile']);
  }


}

