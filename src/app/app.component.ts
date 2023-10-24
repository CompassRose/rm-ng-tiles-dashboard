import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PathToAssets } from './dashboard-constants';
import { SortTileOptionsService } from './services/sort-tiles-options.service';
import { CommonService } from './services/image-support';
import { MockService } from './services/tiles-mock-api';


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

  public firstName: string = '';

  public lastName: string = '';

  public initials: string = '';

  constructor(
    public router: Router,
    public sortTileOptionsService: SortTileOptionsService,
    public imageService: CommonService,
    public mockTileService: MockService,
    public changeDetector: ChangeDetectorRef) {


    this.mockTileService.combineAndSendLatestValues()
      .subscribe((response: any) => {
        console.log('combineAndSendLatestValues response ', response)
      })

    this.mockTileService.apiFlagsSubject$.subscribe((res: any) => {
      console.log('tester ', res)
    })

    this.mockTileService.apiUsersSubject$.subscribe((res: any) => {
      console.log('apiUsersSubject ', res)
    })


    this.mockTileService.apiPrioritiesSubject$.subscribe((res: any) => {
      console.log('apiPrioritiesSubject ', res)
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

    const mockFlags = this.mockTileService.loadConfiguration('mock-flags.json');
    const mockUsers = this.mockTileService.loadConfiguration('mock-users.json');
    const mockPriorities = this.mockTileService.loadConfiguration('mock-priorities.json');

    setTimeout(() => {
      this.mockTileService.apiFlagsSubject$.next(mockFlags);
      this.mockTileService.apiUsersSubject$.next(mockUsers);
      this.mockTileService.apiPrioritiesSubject$.next(mockPriorities);
      this.mockTileService.combineAndSendLatestValues()
    }, 1000);




    // .subscribe((response) => {

    // })
    // }



    // if (window.localStorage.getItem('tiles-profile')) {

    //   const tempImg: any = window.localStorage.getItem(JSON.parse('tiles-profile'));
    //   console.log('tempImg ', tempImg)
    //   this.imageService.setImageFile(tempImg.avatar);
    // }



    //tiles-profile

    // if (window.localStorage.getItem('editedAvatarImage')) {
    //   // @ts-ignore
    //   if (window.localStorage.getItem('editedAvatarImage')) {
    //     editedmageData = window.localStorage.getItem('editedAvatarImage');
    //     this.imageService.loadImage(editedmageData)
    //     this.userInfo = true;
    //   }
    //   this.imageService.changePicture(editedmageData);
    // }


    // @ts-ignore
    if (window.localStorage.getItem('tiles-profile')) {

      editedmageData = window.localStorage.getItem('tiles-profile');
      const loginInfo = JSON.parse(editedmageData)
      console.log('loginInfo ', loginInfo)
      this.firstName = loginInfo.firstName;
      this.lastName = loginInfo.lastName;
      this.initials = loginInfo.initials;
      this.imageService.loadImage(loginInfo);
      this.userInfo = true;
    }
    //this.imageService.changePicture(editedmageData);


    this.router.navigate(['/start-page']);
  }




  public openAvatarModal(option: any, idx: number) {
    const myModalEl = document.getElementById('exampleModal');
    console.log('goToDestination ', option);
  }




  public gottoAvatarScreen() {
    // this.router.navigate(['/avatar-screen']);
    this.router.navigate(['/profile']);
  }



  public setCollectionType(id: number) {

    let newColl: any[] = [];
    this.selectedFlagElement = id;
    this.sortTileOptionsService.dashboard = [...this.sortTileOptionsService.savedDashboard];
    this.hassSelectionBeenRegistered = true;

    this.sortTileOptionsService.dashboard.map((cb: any) => {
      if (cb.priority === id) {
        newColl.push(cb);
      }
    })

    this.sortTileOptionsService.selectedFlag(newColl);
  }



  public getCollectionLength(id: number): number {
    // console.log('getCollectionLength ', id)
    let counter = 0;
    this.sortTileOptionsService.savedDashboard.map((cb: any) => {
      if (cb.priority === id) {
        counter += 1;
      }
    })
    return counter;
  }




  public resetCollectionType() {
    this.hassSelectionBeenRegistered = false;
    this.sortTileOptionsService.dashboard = [...this.sortTileOptionsService.savedDashboard];
  }




}

