import { Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()


export class CommonService {

    public imageValue$ = new Subject<any>();

    public croppedImage: any = '';


    public editedAvatarImage: any;

    public editedImage$ = new Subject<HTMLImageElement>();

    public newImage$ = new Subject<HTMLImageElement>();

    constructor(public dialog: MatDialog, public router: Router) {

        this.newImage$
            .subscribe((image) => {
                // console.log('  newImage$ ', image)

            })
    }


    public setImageFile(img: any) {
        this.editedAvatarImage = img
    }


    //get the cropped image and closes the dialog 
    //returning an url or null if no image

    public loadImage(src: any): any {

        let savedSrc;

        const image = new Image();
        image.src = src.avatar
        // console.log('\n image ', image)
        image.onload = () => {

            this.newImage$.next(image);
            this.newImage$.complete();
        };
        // console.log('loadImage savedSrc ', savedSrc)
        return savedSrc;
    }


    public changePicture(data: any) {
        console.log('\n image ', data.avatar)
        if (data) {
            // this.loadImage(data.avatar);
            this.imageValue$.next(data.avatar)
        }
    }

    public returnToFlagsScreen() {
        this.router.navigate(['/start-page']);
    }
}