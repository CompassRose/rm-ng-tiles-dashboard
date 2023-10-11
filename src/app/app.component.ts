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



export class AppComponent implements OnInit, AfterViewInit {

  public pathToAssets = PathToAssets;

  public selectedFlagElement = 1;

  public avatarImage: any;

  public realAvatarImage: any;


  public hassSelectionBeenRegistered = false;



  public file: string = '';

  constructor(public router: Router, public sortTileOptionsService: SortTileOptionsService, public imageService: CommonService, public changeDetector: ChangeDetectorRef) {


    this.imageService.imageCollect$
      .subscribe((image: any) => {
        console.log('||||||||||||||||||||||| image ', image)
      })


    this.imageService.imageValue$
      .subscribe((image) => {

        // @ts-ignore
        const imageData: any = window.localStorage.getItem('avatarImage');
        console.log('PRE  image ', image)

        // const tom: any = document.getElementById('myNewAvatar') as HTMLImageElement;

        if (image !== null) {


          // @ts-ignore
          img.src = image;

          const img = new Image();

          img.src = imageData;

          console.log('myAvatar result ', imageData)

          console.log('myAvatar img ', img)

          const tester = img as HTMLImageElement;

          console.log('tester ', tester)
          // document.body.appendChild(img)

          this.imageService.imageCollect$.next(img)

          // @ts-ignore
          const numImgs = document.getElementById('myNewAvatar').querySelectorAll('img').length;

          console.log(' -----------APPLICATION myAvatar img ', img, ' num ', numImgs)

          // if (numImgs === 0) {

          // @ts-ignore
          //document.getElementById('myNewAvatar').appendChild(img);
          this.imageService.imageChangedEvent = true;
          //}

          // if (document.getElementById('myNewAvatar')) {
          //   // @ts-ignore
          //   document.getElementById('myNewAvatar').appendChild(img)
          //   //console.log('image ', image)
          // }

        }
        //else {
        // console.log('ELLLLLLSE')
        // console.log('image ', image)
        //}



        //const tom = document.getElementById('myNewAvatar')

        //console.log('\n\n\n\n\n*************************** tom ', this.realAvatarImage)

      })
  }


  public ngAfterViewInit(): void {

    console.log('image ')

    // const parent = document.getElementById('avatar-parent')
    // const child = document.getElementById('myNewAvatar')
    //
    // parent.removeChild(child)
    // @ts-ignore
    // const imageData: any = JSON.parse(window.localStorage.getItem('avatarImage'));
    // this.imageService.changePicture(imageData);

    //let img = new Image();
    // @ts-ignore
    // img.src = imageData;

    // @ts-ignore
    //this.file = imageData;


    //console.log('APPLICATION myAvatar file ', imageData)

    // @ts-ignore
    const imageData: any = window.localStorage.getItem('avatarImage');
    console.log('imageData ', imageData)
    //this.loadImage(imageData)
    this.imageService.changePicture(imageData);

  }



  public ngOnInit(): void {

    // this.imageCollect$
    //   .subscribe(image => {
    //     console.log('$$$$$$$$$$$$$$$$$$$$$$ image ', image)
    //   })
    // if (!document.getElementById('myNewAvatar')) {

    //   let elem: any = document.getElementById('avatar-parent')
    //   console.log('elem ', elem)
    //   let mna: any = document.createElement('myNewAvatar');
    //   console.log('elem ', mna)

    //   elem.appendChild(mna);


    //   // @ts-ignore
    //   //document.getElementById('myNewAvatar').appendChild(this.realAvatarImage)
    // }

    // if (document.getElementById('myNewAvatar')) {
    //   const box = document.getElementById('myNewAvatar')
    //   // @ts-ignore
    //   console.log(box.getAttribute('id')); // box-1
    //   // @ts-ignore
    //   box.removeAttribute('id');
    //   // @ts-ignore
    //   console.log(box.getAttribute('id')); // null
    // }
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

