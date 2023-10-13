import { AfterViewInit, Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { BehaviorSubject, Subject, Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router'; // CLI imports router
import { PathToAssets } from './dashboard-constants';
import { SortTileOptionsService } from './services/sort-tiles-options.service';
import { CommonService } from './services/image-support';


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

  constructor(public router: Router, public sortTileOptionsService: SortTileOptionsService, public imageService: CommonService, public changeDetector: ChangeDetectorRef) {



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

        //const tom = document.getElementById('myNewAvatar')

      })
  }




  public ngOnInit(): void {

    let editedmageData;
    let cropperBackImaage;

    if (window.localStorage.getItem('avatarImage')) {
      const tempImg = window.localStorage.getItem('avatarImage')
      this.imageService.setImageFile(tempImg)

    }

    if (window.localStorage.getItem('editedAvatarImage')) {

      // @ts-ignore
      if (window.localStorage.getItem('editedAvatarImage')) {
        editedmageData = window.localStorage.getItem('editedAvatarImage');
        this.imageService.loadImage(editedmageData)
        this.userInfo = true;
      }

      this.imageService.changePicture(editedmageData);
    }

    this.router.navigate(['/start-page']);
  }



  public openAvatarModal(option: any, idx: number) {

    const myModalEl = document.getElementById('exampleModal');

    console.log('goToDestination ', option)

  }


  public gottoAvatarScreen() {

    // console.log('gottoAvatarScreen ')

    this.router.navigate(['/avatar-screen']);
  }



  // this.savedDashboard
  public setCollectionType(id: number) {
    let newColl: any[] = [];

    this.selectedFlagElement = id;

    //  console.log('setCollectionType ')
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
    // console.log('counter ', counter)
    return counter
  }

  public resetCollectionType() {
    this.hassSelectionBeenRegistered = false;
    this.sortTileOptionsService.dashboard = [...this.sortTileOptionsService.savedDashboard];
  }

  public getNumRoutesSelected(): boolean {
    let test = false;
    if (this.sortTileOptionsService.selectedRoutes.length === this.sortTileOptionsService.routeList.length) {
      test = true;
    }
    return test
  }

}

