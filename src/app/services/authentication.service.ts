import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {

  constructor() { }

  isLoginSubject$ = new BehaviorSubject<string>('');

  public logIn(userId: string) {
    localStorage.setItem('currentUser', JSON.stringify(userId));
    this.isLoginSubject$.next(userId);
  }


  public isLoggedIn(): Observable<string> {
    return this.isLoginSubject$.asObservable();
  }


  public logout() {
    localStorage.removeItem('currentUser');
    this.isLoginSubject$.next('');
  }
}
