import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { TokenResponse, SpotifyUser } from "../../../callback/callback";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({providedIn: 'root'})

export class SpotifyService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public callback(code: string | null, redirect_uri: string | null): Observable<TokenResponse> {
    let encodedClientData = btoa(environment.spotifyClientId + ':' + environment.spotifyClientSecret);
    return this.http.post<TokenResponse>(`https://accounts.spotify.com/api/token`, 
    `code=${code}&redirect_uri=${environment.appUrl}spotify-callback&grant_type=authorization_code`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encodedClientData}`
      }
    }
  );
  }

  public saveUserData(accessToken: string |null, refreshToken: string | null, currentUserId: string | null): Observable<SpotifyUser> {
    console.log('saved');
    return this.http.post<SpotifyUser>(`${environment.apiUrl}spotify/users`, {
      accessToken: accessToken,
      refreshToken: refreshToken,
      userId: currentUserId
    });
  }
}