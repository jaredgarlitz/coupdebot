import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenResponse, TwitchUser } from '../../../callback/callback';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class TwitchService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public callBack(code: string | null, scope: string | null): Observable<TokenResponse> {
    return this.http.post<TokenResponse>('https://id.twitch.tv/oauth2/token', 
      {
      client_id: '',
      client_secret: '',
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:4200/callback'
    });
  }

  public saveUserData(accessToken: string | null, refreshToken: string | null, currentUserId: string | null): Observable<TwitchUser> {
    return this.http.post<TwitchUser>('http://localhost:3500/api/twitch/users',
      {
        accessToken: accessToken,
        refreshToken: refreshToken,
        userId: currentUserId
    });
  }
}