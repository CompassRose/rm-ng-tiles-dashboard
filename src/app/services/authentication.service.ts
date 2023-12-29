import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {


  public isUserLoginSubject$ = new BehaviorSubject<any>(null);


  public logIn(userId: string) {

    localStorage.setItem('currentUser', userId);

    // this.isUserLoginSubject$.next(userId);

  }


  public activeUserLoggedObj(user: any) {

    // localStorage.setItem('currentUser', userId);
    //console.log('USER ', user)
    this.isUserLoginSubject$.next(user);

  }



  public isLoggedIn(): Observable<any> {
    return this.isUserLoginSubject$.asObservable();
  }


  public logout() {
    localStorage.removeItem('currentUser');
    this.isUserLoginSubject$.next(null);
  }
}
