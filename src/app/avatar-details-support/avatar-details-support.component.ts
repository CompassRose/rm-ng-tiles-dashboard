import { Component, OnInit, OnDestroy } from '@angular/core';
import { SortTileOptionsService } from '../services/sort-tiles-options.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../services/image-support';
import Cropper from 'cropperjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'avatar-details-display',
  templateUrl: './avatar-details-support.component.html',
  styleUrls: ['./avatar-details-support.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AvataDetailsSupportComponent
    }
  ]
})


export class AvataDetailsSupportComponent implements OnInit, ControlValueAccessor {

  file: string = '';
  cropper!: Cropper;

  croppedImage: any = '';

  public imgBlob: any;

  public sub01 = new Subscription()

  constructor(
    public router: Router,
    public sortTileOptionsService: SortTileOptionsService,
    public dialog: MatDialog) { }


  writeValue(_file: string): void {
    console.log('writeValue ', _file)
    this.file = _file;
  }
  registerOnChange(fn: any): void {
    console.log('registerOnChange ', fn)
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    console.log('registerOnTouched ', fn)
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  public ngOnInit(): void { }


  onChange = (fileUrl: string) => { };

  onTouched = () => { };

  disabled: boolean = false;

  onFileChange(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.resetInput();
      this.openAvatarEditor(_file)
        .subscribe(
          (result) => {
            if (result) {
              this.file = result;
              this.onChange(this.file);
            }
          }
        )
    }
  }

  openAvatarEditor(image: string): Observable<any> {
    const dialogRef = this.dialog.open(ImageCropperComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: image,
    });

    return dialogRef.afterClosed();
  }

  resetInput() {
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  }
}
