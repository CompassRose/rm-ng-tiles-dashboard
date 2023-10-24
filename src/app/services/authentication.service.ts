import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  login(username: string, password: string) {
    // console.log('AuthenticationService ', username, ' password ', password);
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username: username, password: password }).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.isLoginSubject.next(true);
        }
        return user;
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.isLoginSubject.next(false);
  }
}
