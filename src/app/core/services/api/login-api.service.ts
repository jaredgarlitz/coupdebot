import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs";

import { Login } from "../../../login/login";

@Injectable({
  providedIn: 'root'
})

export class LoginApiService {
  private path = 'http://localhost:3500/api';

  constructor(
    private http: HttpClient,
  ) { }

  public login(email: string | null, password: string | null): Observable<Login> {
    let response = this.http.post<Login>(`${this.path}/auth`, {email: email, password: password});
    return response;
  }

  public checkAuthenticate() {

  }

  public registerUser(email: string | null, password: string | null, firstName: string | null, lastName: string | null, userName: string | null): Observable<Login> {
    let response = this.http.post<Login>(`${this.path}/users`, {email: email, password: password, firstName: firstName, lastName: lastName, userName: userName});
    return response;
  }
}