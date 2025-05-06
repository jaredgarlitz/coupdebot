import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { TokenResponse, SpotifyUser } from "../../../callback/callback";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({providedIn: 'root'})

export class DiscordService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public callback(code: string | null): Observable<TokenResponse> {
    let encodedClientData = btoa(environment.spotifyClientId + ':' + environment.spotifyClientSecret);
    return this.http.post<TokenResponse>(`https://discord.com////api/oauth2/token`, 
    `code=${code}&redirect_uri=${environment.appUrl}spotify-callback&grant_type=authorization_code&client_id=client_id&client_secret=client_secret`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Authorization': `Basic ${encodedClientData}`
      },
      withCredentials: true,

    }
  );
  }

  public saveUserData(accessToken: string |null, refreshToken: string | null, currentUserId: string | null): Observable<SpotifyUser> {
    console.log('saved');
    return this.http.post<SpotifyUser>(`${environment.apiUrl}discord/users`, {
      accessToken: accessToken,
      refreshToken: refreshToken,
      userId: currentUserId
    });
  }
}