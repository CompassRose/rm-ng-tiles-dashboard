import { Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()


export class CommonService {

    public imageValue$ = new Subject<any>();

    imageChangedEvent = false;
    croppedImage: any = '';

    public editedAvatarImage: any;

    public editedImage$ = new Subject<HTMLImageElement>();

    constructor(public dialog: MatDialog, public router: Router) {

        // this.imageValue$
        //     .subscribe(image => {
        //         console.log('\n image Sub ', image)
        //     })

    }


    public changePicture(data: any) {
        console.log('\n image ', data)
        if (data) {
            this.imageValue$.next(data)
        }
    }

    public returnToFlagsScreen() {
        this.router.navigate(['/start-page']);
    }
}