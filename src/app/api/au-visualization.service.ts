import { Injectable, Inject, InjectionToken } from '@angular/core';


import { map, mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, catchError, of as _observableOf } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isRunningWebView } from "../shared/webview-checker";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export const BASE_LOCALHOST_5000 = "http://localhost:5000";




export class ApiException extends Error {
  override message: string;
  status: number;
  response: string;
  headers: { [key: string]: any; };
  result: any;



  constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {

    console.log('  constructor  ', message)
    super();
    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;

  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}



function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
  console.log('throwException ', message, ' status ', status, ' response ', response, ' headers ', headers)
  if (result !== null && result !== undefined)
    return _observableThrow(result);
  else
    return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next("");
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = event => {
        observer.next((event.target as any).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}

@Injectable({
  providedIn: 'root'
})

export class BidPriceAspNetService {

  //public readonly bucketUrl: string = 'https://rms-json-continuous-price.s3.us-west-2.amazonaws.com/bucketConfigs.json';
  //public readonly continuousFaresUrl: string = 'https://rms-json-continuous-price.s3.us-west-2.amazonaws.com/continuousFares.json';
  //public readonly competetiveFaresUrl: string = 'https://rms-json-continuous-price.s3.us-west-2.amazonaws.com/competitiveFares.json';
  //public readonly flightClientUrl: string = 'https://rms-json-continuous-price.s3.us-west-2.amazonaws.com/flightDetails.json';

  //local file temporarily
  //public readonly flightDetailsFromLocal = './assets/config/flightDetails.json';
  //public apiTarget;

  constructor(@Inject(HttpClient) protected http: HttpClient, private sanitizer: DomSanitizer) {

    //   // this.apiTarget = sanitizer.bypassSecurityTrustResourceUrl(this.bucketUrl);
    //   ///this.airlineConfigClient = new AirlineConfigClient(this.http, this.apiTarget.changingThisBreaksApplicationSecurity);
    //   //this.competitiveFareDetails = new CompetitiveFareDetails(this.http, this.apiTarget.changingThisBreaksApplicationSecurity);
  }
}

