import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ColorManagerService } from '../services/color-manager-service';



export interface ColorScheme {
    id: number;
    name: string;
    value: any;
}

@Injectable({
    providedIn: 'root',
})


export class ChartColorService {

    // Bar Chat color schemes
    public allColorRanges: ColorScheme[] = [];
    public selectedColorRange: number = 0;

    public colorRange: string[] = [];

    public colorRangeSelection$ = new Subject<any>();

    constructor(private colorManagerService: ColorManagerService) {

    }


    public setFareClassNumberToColorScheme(numClasses: number): void {

        this.allColorRanges = [];

        const blueRampRange = ['#121291', '#c4d2ff'];
        const redRampRange = ['#7c0e00', '#fa97a7'];
        const orangeRampRange = ['#804400', '#ffdaa3'];
        const greenRampRange = ['#115102', '#dfff33'];

        this.allColorRanges.push({ id: 0, name: 'Blue', value: this.colorManagerService.generateRamps(numClasses, blueRampRange) });
        this.allColorRanges.push({ id: 1, name: 'Green', value: this.colorManagerService.generateRamps(numClasses, greenRampRange) });
        this.allColorRanges.push({ id: 2, name: 'Red', value: this.colorManagerService.generateRamps(numClasses, redRampRange) });
        this.allColorRanges.push({ id: 3, name: 'Orange', value: this.colorManagerService.generateRamps(numClasses, orangeRampRange) });

        console.log('allColorRanges ', this.allColorRanges)

        this.colorRange = this.allColorRanges[this.selectedColorRange].value;
        this.colorRangeSelection$.next(this.colorRange);

        // if (this.systemColors && this.systemColors.length > 0) {
        //     this.allColorRanges.push({ id: 4, name: 'Airm System', value: this.systemColors });
        // }
        // if (this.userColors && this.userColors.length > 0) {
        //     this.allColorRanges.push({ id: 5, name: 'Airm User', value: this.userColors });
        // }
    }

    // From Color Dropdown and at app start
    public getColorValues(choice: any): void {
        console.log('getColorValues ', choice)
        if (choice === null) {
            choice = 0;
        }
        this.selectedColorRange = choice;
        this.colorRange = this.allColorRanges[choice].value;
        console.log(' this.colorRange  ', this.colorRange)
        window.localStorage.setItem('colorRamp', JSON.stringify(JSON.parse(JSON.stringify(choice))));
        this.colorRangeSelection$.next(this.allColorRanges[choice]);
    }


}