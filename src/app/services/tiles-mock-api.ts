import { Injectable, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, AsyncSubject, ReplaySubject, catchError, map, Observable, combineLatest, debounceTime, switchMap, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { UserModel } from '../models/tiles.model';


export const testArray01: any[] = [
  { id: 1, name: 'user 1' },
  { id: 1, name: 'user 1' },
  { id: 1, name: 'user 1' },
];
export const testArray02: number[] = [6, 7, 8, 9, 10];

@Injectable()

export class MockService implements OnInit {

  //public myFlagObj = {}

  //public apiUsersSubject$ = new BehaviorSubject<any[]>([]);

  //public apiFlagsSubject$ = new BehaviorSubject<any[]>([]);

  public apiPrioritiesSubject$ = new BehaviorSubject<any[]>([]);

  //public userLoggedInSubject$ = new ReplaySubject<UserModel>();

  //private readonly destroySubj = new Subject<void>();

  //public isLoggedIn = false;

  //public selectedUserSubject$ = new BehaviorSubject<any>(null);


  //public dashboardFlags: any[] = [];

  //public flagTypeBehaviorSubject$ = new BehaviorSubject<any[]>([]);

  //public flagObjects = "../assets/json/mock-flags.json";

  // public userObjects = "../assets/json/mock-users.json";

  //public priorityObjects = "../assets/json/mock-priorities.json";

  //public selectedFlags: any;

  //public flagTypeSelect: any[] = [];

  // public selectedUser: UserModel;

  // public allUserList: UserModel[] = [];

  // public selectedUsersBySupervisor: number[] = [];

  //public FullName: string = '';

  //public UserId: string = '';

  //public UserType: string = '';

  //public IsSupervisor = false;





  constructor(private http: HttpClient) {


    // this.selectedUsersBySuperSubject$
    //   .subscribe((su: any) => {

    //     this.selectedUsersBySupervisor.push(...su);
    //     console.log('selectedUsersBySupervisor   ', su)
    //   })


    const getInitials = function (string: string) {
      var names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();

      if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
      }
      return initials;
    };

    // this.apiUsersSubject$
    //   .subscribe((users: UserModel[]) => {
    //     if (users.length > 0) {
    //       this.allUserList = users;
    //       //  console.log('this.allUserList  ', this.allUserList)

    //       this.allUserList.map((au: UserModel, i: number) => {
    //         au.state = false;
    //         au.UserInitials = getInitials(au.FullName)
    //         return au;
    //       })
    //     }
    //   })




    // this.userLoggedInSubject$
    //   .subscribe(user => {
    //     if (user !== null) {
    //       // console.log('this. user  ', user)

    //       this.isLoggedIn = true;
    //       this.FullName = user.FullName;
    //       this.UserId = user.UserId;
    //       this.IsSupervisor = user.IsSupervisor;
    //       this.UserType = user.UserType;

    //       //  this.userLoggedInSubject$.next(user)
    //     } else {
    //       this.isLoggedIn = false;
    //     }
    //   })



  }

  public ngOnInit(): void { }





  public loadConfiguration(type: string) {

    const _url = "../assets/json/";
    // console.log('loadConfiguration flagObjects ', type)
    this.http.get(`${_url}${type}.json`)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(error => {
          console.log('Caught ', error)
          throw error;
        }),
      )
      .subscribe(res => {

        if (type === 'mock-flags') {
          // this.generateFlagTypeGroup(res)
          // this.selectedFlags = res;
          //  this.apiFlagsSubject$.next(res)
        } else if (type === 'mock-users') {
          //this.apiUsersSubject$.next(res)
        } else {
          this.apiPrioritiesSubject$.next(res)
        }

      });

  }

  // Logged In User
  public returnUserFromDropdown(event: any): any {
    //  console.log(' returnUserFromDropdown ', event)
    return event
  }


  // From Flag Type dropdown
  // public selectFlagTypes(event: any) {

  //   let flagListReturn = [...this.selectedFlags];
  //   if (event === 'All') {
  //     flagListReturn = this.selectedFlags
  //   } else {
  //     flagListReturn = this.selectedFlags.filter((flag: any) => {
  //       if (flag.FlagType === event) {
  //         return flag
  //       }
  //     })
  //   }
  //   this.apiFlagsSubject$.next(flagListReturn)
  // }



  // public generateFlagTypeGroup(items: any) {

  //   this.flagTypeSelect.push('All');

  //   items.forEach((it: any, i: number) => {
  //     if (!this.flagTypeSelect.includes(it.FlagType)) {
  //       this.flagTypeSelect.push(it.FlagType)
  //     }
  //   })
  //   // console.log('this.flagTypeSelect ', this.flagTypeSelect)
  //   this.flagTypeBehaviorSubject$.next(this.flagTypeSelect)

  // }

  // public onFlagsSelected(item: any, idx: number) {

  //   // console.log('onFlagsSelected ', item)
  // }


  /**
   * @return Three element array, elem 1 is FlightClientDetails, elem 2 is BidPriceInfluencers[]
   */
  // public combineAndSendLatestValues() {
  //   //console.log('combineAndSendLatestValues ')
  //   // debounce time insures enough time to get all new values,
  //   // switchMap: higher order observable that unsubscribes after return...
  //   // and if there is a fast hover it cancels current operation and starts new evaluation

  //   // noinspection UnnecessaryLocalVariableJS
  //   const returnVal: Observable<any> =
  //     combineLatest(
  //       [this.apiUsersSubject$, this.apiFlagsSubject$, this.apiPrioritiesSubject$]
  //     ).pipe(
  //       // debounceTime(10),
  //       switchMap(([users, flags, priorities]) => {
  //         //  console.log('users ', users, '\nflags ', flags, '\npriorities ', priorities)
  //         return of([users, flags, priorities])
  //       })
  //     )
  //   return returnVal;
  // }

}