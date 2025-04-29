import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

@Component({
  selector: 'twitch-connect-component',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './twitch-connect.component.html',
  styleUrl: './twitch-connect.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SpotifyConnectComponent {
  url = `https://id.twitch.tv/oauth2/authorize?client_id=${environment.twitchClientId}&redirect_uri=${environment.appUrl}callback&response_type=code&scope=channel%3Abot`;

  constructor(
    private router: Router
  ){
  }
}