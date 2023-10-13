import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import Cropper from 'cropperjs';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, from, Subject, concatMap } from 'rxjs';
import { CommonService } from '../services/image-support';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})

export class ImageCropperComponent implements OnInit, AfterViewInit {

  sanitizedUrl: any;
  cropper!: Cropper;
  public myAvatar: any = {};

  constructor(
    public imageService: CommonService,
    public dialogRef: MatDialogRef<ImageCropperComponent>,
    @Inject(MAT_DIALOG_DATA) public image: string,
    private sanitizer: DomSanitizer
  ) {
    // console.log('||||||||||||||||||||  dialogRef ', this.dialogRef)

    // with (request.urlopen('data:image/png;base64,iVBORw0...') as response:
    // im = response.read())

  }

  ngOnInit(): void {
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.image);
  }

  ngAfterViewInit() {
    this.initCropper();
  }


  initCropper() {

    const image = document.getElementById('image') as HTMLImageElement;

    console.log(' initCropper ', image)

    this.cropper = new Cropper(image,
      {
        aspectRatio: 1,
        viewMode: 1,
        guides: false,

      });

    //console.log('cropper ', this.cropper.getCanvasData())
  }

  // make the crop box rounded

  getRoundedCanvas(sourceCanvas: any) {
    const canvas = document.createElement('canvas');
    var context: any = canvas.getContext('2d');
    var width = sourceCanvas.width / 3;
    var height = sourceCanvas.height / 3;
    // console.log('width ', width, ' height ', height)
    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;

    context.drawImage(sourceCanvas, 0, 0, width, height);

    context.globalCompositeOperation = 'destination-in';

    context.beginPath();

    context.arc(
      width / 2,
      height / 2,
      Math.min(width, height) / 2,
      0,
      2 * Math.PI,
      true
    );
    context.fill();
    return canvas;
  }

  //get the cropped image and closes the dialog 
  //returning an url or null if no image

  public loadImage(src: any): Observable<HTMLImageElement> {

    const imageCollect$ = new Observable<HTMLImageElement>();
    console.log('$$$$$$$$$$$$$$$$$$$$$$ image ', src)
    const image = new Image();
    image.src = src;
    image.onload = () => {

      this.imageService.editedImage$.next(image);
      this.imageService.editedImage$.complete();
    };

    return imageCollect$;
  }

  // private loadInSequence(images: string[]): Observable<HTMLImageElement> {
  //   return from(images).pipe(
  //     concatMap(src => this.loadImage(src))
  //   );
  //}


  crop() {

    const croppedCanvas = this.cropper.getCroppedCanvas();
    const roundedCanvas = this.getRoundedCanvas(croppedCanvas);
    let roundedImage = document.createElement('img');

    console.log('roundedCanvas ', roundedCanvas.toDataURL(), ' roundedImage ', roundedImage)

    window.localStorage.setItem('editedAvatarImage', roundedCanvas.toDataURL());

    this.imageService.changePicture(roundedCanvas.toDataURL())

    this.imageService.imageChangedEvent = true;

    // this.loadInSequence([roundedCanvas.toDataURL()])
    if (roundedImage) {
      this.dialogRef.close([roundedCanvas.toDataURL()]);
    } else {
      return this.dialogRef.close(null);
    }


  }


  // resets the cropper
  reset() {
    this.cropper.clear();
    this.cropper.crop();
    this.dialogRef.close(null);
    this.imageService.returnToFlagsScreen()
    // console.log(' this.cropper ', this.cropper)
  }

}

