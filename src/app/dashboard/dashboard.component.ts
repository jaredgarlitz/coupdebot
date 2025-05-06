import { AfterViewInit, ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { AuthenticationService } from "../core/services/api/auth-api.service";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { TwitchService } from "../core/services/api/twitch-api.service";
import { SpotifyService } from "../core/services/api/spotiy-api.service";
import { tap } from "rxjs";

@Component({
  selector: 'dashboard-component',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardComponent implements AfterViewInit{
  twitchConnected = signal(true);
  discordConnected = signal(true);
  spotifyConnected = signal(true);

  twitchUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${environment.twitchClientId}&redirect_uri=${environment.appUrl}callback&response_type=code&scope=channel%3Abot+chat%3Aedit`;
  twitchScopes = [
    'channel:bot'
  ];

  discordUrl = 'https://discord.com/oauth2/authorize?client_id=1092819815342813224&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fdiscord-callback&integration_type=0&scope=messages.read+webhook.incoming';
  discordScopes = '';

  spotifyParams: {[key: string]: string } = {
    client_id: environment.spotifyClientId,
    response_type: 'code',
    redirect_uri: environment.appUrl + 'spotify-callback',
    scope: 'user-read-currently-playing user-modify-playback-state'
  }
  queryString = new URLSearchParams(this.spotifyParams).toString();
  spotifyUrl = `https://accounts.spotify.com/authorize?${this.queryString}`;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private twitchService: TwitchService,
    private spotifyService: SpotifyService
  ) {
  }
  public logout() {
    this.authService.removeAuth();
    this.router.navigate(['/login']);
  }

  ngAfterViewInit(): void {
    this.authService.verifyUser().pipe(tap(x => {
      if (!x.twitchUsername) { 
        this.twitchConnected.set(false);
      }
      if (!x.spotifyUsername) {
        this.spotifyConnected.set(false);
      }
      if (!x.discordUsername) {
        this.discordConnected.set(false);
      }
    })).subscribe();
  }
}