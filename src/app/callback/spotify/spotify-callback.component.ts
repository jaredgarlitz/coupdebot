import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { first, switchMap } from 'rxjs/operators';
import { AuthenticationService } from "../../core/services/api/auth-api.service";
import { User } from "../../core/services/service";
import { SpotifyService } from "../../core/services/api/spotiy-api.service";

@Component({
  selector: 'spotify-callback-component',
  standalone: true,
  imports: [],
  templateUrl: './spotify-callback.component.html',
  styleUrl: './spotify-callback.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SpotifyCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private authService: AuthenticationService
  ) {}
  code!: string | null;
  scope!: string | null;
  accessToken!: string | null;
  refreshToken!: string | null;

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      first(),
      switchMap(params => {
        console.log(params);
        return this.spotifyService.callback(params.get('code'), params.get('scope'));
      }),
      switchMap(tokenResponse => {
        console.log(tokenResponse);
        this.accessToken = tokenResponse.access_token;
        this.refreshToken = tokenResponse.refresh_token;
        return this.authService.verifyUser();
      })
    ).subscribe((data: User) => {
      this.spotifyService.saveUserData(this.accessToken, this.refreshToken, data._id).subscribe();
    });
  }
}