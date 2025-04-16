import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenResponse, TwitchUser } from '../../../callback/callback';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})

export class TwitchService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public callBack(code: string | null, scope: string | null): Observable<TokenResponse> {
    return this.http.post<TokenResponse>('https://id.twitch.tv/oauth2/token', 
      {
      client_id: environment.twitchClientId,
      client_secret: environment.twitchClientSecret,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: `${environment.appUrl}callback`
    });
  }

  public saveUserData(accessToken: string | null, refreshToken: string | null, currentUserId: string | null): Observable<TwitchUser> {
    return this.http.post<TwitchUser>(`${environment.apiUrl}twitch/users`,
      {
        accessToken: accessToken,
        refreshToken: refreshToken,
        userId: currentUserId
    });
  }
}