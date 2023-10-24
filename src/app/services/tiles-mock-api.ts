import { Injectable, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, catchError, map, Observable, combineLatest, debounceTime, switchMap, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";



export const testArray01: any[] = [
  { id: 1, name: 'user 1' },
  { id: 1, name: 'user 1' },
  { id: 1, name: 'user 1' },
];
export const testArray02: number[] = [6, 7, 8, 9, 10];

@Injectable()

export class MockService implements OnInit {

  public myFlagObj = {}

  public apiUsersSubject$ = new Subject<any[]>();
  public apiFlagsSubject$ = new Subject<number[]>();
  public apiPrioritiesSubject$ = new Subject<number[]>();

  private readonly flagObjects = "../assets/json/mock-flags.json";
  private readonly userObjects = "../assets/json/mock-users.json";
  private readonly priorityObjects = "../assets/json/mock-priorities.json";

  constructor(private http: HttpClient) {
    console.log('MockService ')
    this.apiUsersSubject$.next(testArray01);
    this.apiFlagsSubject$.next(testArray02);
    this.apiPrioritiesSubject$.next(testArray02);
  }


  public ngOnInit(): void {
    console.log('ngOnInit flagObjects ',)
    //this.myFlagObj = this.loadConfiguration();
  }
  // @ts-ignore

  public loadConfiguration(type: string): any {

    const _url = "../assets/json/";
    // console.log('loadConfiguration flagObjects ', `${_url}${type}`)
    return this.http.get(`${_url}${type}`)
      .pipe(
        map(response => {
          console.log('response ', response)
          return response;
        }),
        catchError(error => {
          console.log('Caught ', error)
          throw error;
        }),
      );

  }

  /**
   * @return Three element array, elem 1 is FlightClientDetails, elem 2 is BidPriceInfluencers[]
   */
  public combineAndSendLatestValues(): Observable<any> {
    console.log('combineAndSendLatestValues ')
    // debounce time insures enough time to get all new values,
    // switchMap: higher order observable that unsubscribes after return...
    // and if there is a fast hover it cancels current operation and starts new evaluation

    // noinspection UnnecessaryLocalVariableJS
    const returnVal: Observable<any> =
      combineLatest(
        [this.apiUsersSubject$, this.apiFlagsSubject$, this.apiPrioritiesSubject$]
      ).pipe(
        //debounceTime(10),
        switchMap(([users, flags, priorities]) => {
          console.log('users ', users, '\nflags ', flags, '\npriorities ', priorities)
          return of([users, flags, priorities])
        })
      );
    return returnVal;
  }

}