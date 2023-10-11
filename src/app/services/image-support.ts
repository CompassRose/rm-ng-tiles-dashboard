import { Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable()


export class CommonService {

    public imageValue$ = new BehaviorSubject<any>(null);

    imageChangedEvent = false;
    croppedImage: any = '';
    public imageCollect$ = new Subject<HTMLImageElement>();
    constructor(public dialog: MatDialog) {

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


}