import { Component, OnInit, OnDestroy } from '@angular/core';
import { SortTileOptionsService } from '../services/sort-tiles-options.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../services/image-support';
import Cropper from 'cropperjs';


@Component({
  selector: 'avatar-display',
  templateUrl: './avatar-support.component.html',
  styleUrls: ['./avatar-support.component.scss']
})


export class AvatarSupportComponent implements OnInit, OnDestroy {

  file: string = '';
  cropper!: Cropper;

  croppedImage: any = '';

  public imgBlob: any;

  public sub01 = new Subscription()

  constructor(
    public router: Router,
    public sortTileOptionsService: SortTileOptionsService,
    public dialog: MatDialog,
    public imageService: CommonService) { }

  public ngOnDestroy(): void {

    console.log('||||ngOnDestroy ngOnDestroy \\\ ', this.sub01)

    this.sub01.unsubscribe();
    console.log('A||||ngOnDestroy ngOnDestroy \\\ ', this.sub01)
  }

  public ngOnInit(): void {
    this.file = this.imageService.editedAvatarImage;
    console.log('|||||| ngOnInit \\\\\\ ', this.file)
  }

  onFileChange(event: any) {
    const files = event.target.files as FileList;


    if (files.length > 0) {
      // console.log('|||||| onFileChange \\\\\\ ', files)
      //console.log('????? ', files[0])
      const _file = URL.createObjectURL(files[0]);


      // window.localStorage.setItem('avatarImage', (_file));

      //console.log('????? ', _file)
      this.resetInput();

      this.sub01 = this.openAvatarEditor(_file)
        .subscribe(
          (result) => {


            if (result) {
              window.localStorage.setItem('avatarImage', (result));
              // const img = new Image();
              // img.src = result;
              //console.log('myAvatar img ', img)
              this.file = result;
              console.log('.filetor ', this.file)
              // this.imageService.returnToFlagsScreen();
            }
          }
        )
    }
  }


  public resetInput() {

    const input = document.getElementById('avatar-input-file') as HTMLInputElement;

    // console.log('input ', input)
    if (input) {
      input.value = "";
    }

  }


  public setInitials(event: any) {
    console.log('setInitials ', event)
  }


  public openAvatarEditor(image: string): Observable<any> {

    // @ts-ignore
    const imageData: any = window.localStorage.getItem('avatarImage');

    this.file = imageData;
    console.log(' this.file ', this.file);

    const dialogRef = this.dialog.open(ImageCropperComponent, {
      maxWidth: '60vw',
      maxHeight: '60vh',
      data: image,
    });

    //console.log('openAvatarEditor dialogRef ', dialogRef)
    return dialogRef.afterClosed();
  }

  public saveAndCloseEditor() {
    this.imageService.returnToFlagsScreen()
  }

  // resets the cropper
  public reset() {
    this.cropper.clear();
    this.cropper.crop();
  }


}
