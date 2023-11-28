import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {


  public isUserLoginSubject$ = new Subject<any>();


  public logIn(userId: string) {
    localStorage.setItem('currentUser', JSON.stringify(userId));
    this.isUserLoginSubject$.next(userId);
  }


  public isLoggedIn(): Observable<string> {
    return this.isUserLoginSubject$.asObservable();
  }


  public logout() {
    localStorage.removeItem('currentUser');
    this.isUserLoginSubject$.next(null);
  }
}
