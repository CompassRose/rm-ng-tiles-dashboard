import { Component } from '@angular/core';
import { SortTileOptionsService } from '../services/sort-tiles-options.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../services/image-support';
import Cropper from 'cropperjs';


@Component({
  selector: 'avatar-display',
  templateUrl: './avatar-support.component.html',
  styleUrls: ['./avatar-support.component.scss']
})


export class AvatarSupportComponent {

  file: string = '';
  cropper!: Cropper;

  croppedImage: any = '';

  public imgBlob: any;

  constructor(
    public router: Router,
    public sortTileOptionsService: SortTileOptionsService,
    public dialog: MatDialog,
    public imageService: CommonService) { }



  onFileChange(event: any) {

    const files = event.target.files as FileList;

    if (files.length > 0) {
      // console.log('????? ', files[0])
      const _file = URL.createObjectURL(files[0]);
      //console.log('????? ', _file)
      this.resetInput();

      this.openAvatarEditor(_file)
        .subscribe(
          (result) => {
            console.log('openAvatarEditor ', result, ' typeof ', typeof (result))
            if (result) {
              window.localStorage.setItem('avatarImage', result);
              const img = new Image();
              img.src = result;
              console.log('myAvatar img ', img)
              this.file = result;
              this.imageService.returnToFlagsScreen();
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


  public openAvatarEditor(image: string): Observable<any> {

    // @ts-ignore
    const imageData: any = window.localStorage.getItem('avatarImage');

    const dialogRef = this.dialog.open(ImageCropperComponent, {
      maxWidth: '40vw',
      maxHeight: '40vh',
      data: image,
    });

    //console.log('openAvatarEditor dialogRef ', dialogRef)
    return dialogRef.afterClosed();
  }


  // resets the cropper
  reset() {
    this.cropper.clear();
    this.cropper.crop();
  }




}
