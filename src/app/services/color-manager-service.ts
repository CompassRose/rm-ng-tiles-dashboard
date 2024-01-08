import { Injectable } from '@angular/core';
import { formatHex, samples, interpolate } from 'culori';


const culori = require('culori')



@Injectable({
    providedIn: 'root',
})

export class ColorManagerService {

    public devUserId = 'RMSTEST';

    constructor() { }



    // Coluri Library methods to interpolate colors
    public generateRamps(numClasses: number, colorRange: any): any {

        return samples(numClasses)
            .map(interpolate(colorRange))
            //.map(filterSepia(1))
            .map(formatHex);
    }


}