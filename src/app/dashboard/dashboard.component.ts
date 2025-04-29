import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthenticationService } from "../core/services/api/auth-api.service";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

@Component({
  selector: 'dashboard-component',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardComponent {
  twitchUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${environment.twitchClientId}&redirect_uri=${environment.appUrl}callback&response_type=code&scope=channel%3Abot`;
  twitchScopes = [
    'channel:bot'
  ];
  twitchConnected = true;

  discordUrl = '';
  discordScopes = '';
  discordConnected = true;

  spotifyParams: {[key: string]: string } = {
    client_id: environment.spotifyClientId,
    response_type: 'code',
    redirect_uri: environment.appUrl + 'spotify-callback',
    scope: 'user-read-currently-playing user-modify-playback-state'
  }

  queryString = new URLSearchParams(this.spotifyParams).toString();
  spotifyScopes = '';
  spotifyUrl = `https://accounts.spotify.com/authorize?${this.queryString}`;
  spotifyConnected = true;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }
  public logout() {
    this.authService.removeAuth();
    this.router.navigate(['/login']);
  }
}