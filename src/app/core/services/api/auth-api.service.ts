import { Injectable, inject } from '@angular/core';
import { concat, Observable, tap, defer, ReplaySubject, shareReplay, BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})

export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }

  apiUrl = environment.apiUrl;

  public isAuthenticated() {
    if (this.verifyUser()?.subscribe() == null) {
      this.router.navigate(['/login']);
    }
  }

  public verifyUser(): Observable<User> {
      return this.http.get<User>(`${this.apiUrl}auth/${this.getAuthCookie()}`);
  }

  public setAuthCookie(authToken: string) {
    localStorage.setItem('authToken', authToken);
  }

  public getAuthCookie() {
    return localStorage.getItem('authToken');
  }

  public removeAuth() {
    return localStorage.removeItem('authToken');
  }
}

export const isAuthenticated = () => {
  let router = inject(Router);

  if (getAuthCookie()) {
    let http = inject(HttpClient);
    let userData = http.get<User>(`${environment.apiUrl}auth/${getAuthCookie()}`).pipe(tap(
      x => {
        if(!x._id) {
          router.navigate(['login']);
        }
        return x;
      }
    )).subscribe();
  } else {
    router.navigate(['login'])
  }
}

export const setAuthCookie = (authToken: string) => {
  localStorage.setItem('authToken', authToken);
}

export const getAuthCookie = () => {
  return localStorage.getItem('authToken');
}