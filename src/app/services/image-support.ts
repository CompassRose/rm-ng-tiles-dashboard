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

        console.log('APP Start ///////////||||||||||\\\\\\\\\\\\setInitials ', img)

        this.editedAvatarImage = img
    }


    //get the cropped image and closes the dialog 
    //returning an url or null if no image

    public loadImage(src: any): any {

        let savedSrc;

        const image = new Image();
        image.src = src;
        image.onload = () => {

            // console.log('$$$ image $$$', image, ' type ', type)
            this.newImage$.next(image);
            this.newImage$.complete();
        };

        return savedSrc;
    }


    public changePicture(data: any) {
        // console.log('\n image ', data)
        if (data) {
            this.loadImage(data);
            this.imageValue$.next(data)
        }
    }

    public returnToFlagsScreen() {
        this.router.navigate(['/start-page']);
    }
}