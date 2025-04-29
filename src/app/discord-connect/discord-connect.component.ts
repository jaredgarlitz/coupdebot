import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

@Component({
  selector: 'discord-connect-component',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './discord-connect.component.html',
  styleUrl: './twitch-connect.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DiscordConnectComponent {
  url = '';

  constructor(
    private router: Router
  ) {}
}