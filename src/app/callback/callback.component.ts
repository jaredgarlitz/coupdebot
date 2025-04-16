import { ChangeDetectionStrategy, Component, OnInit, signal } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { first, shareReplay, switchMap } from "rxjs/operators";
import { BehaviorSubject, Subject, tap, Subscription, ReplaySubject } from "rxjs";
import { TokenResponse } from "./callback";
import { TwitchService } from "../core/services/api/twitch-api.service";
import { AuthenticationService } from "../core/services/api/auth-api.service";
import { User } from "../core/services/service";


@Component({
  selector: 'callback-component',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private twitchService: TwitchService,
    private authService: AuthenticationService
  ) {
  }

  code!: string | null;
  scope!: string | null;
  accessToken!: string | null;
  refreshToken!: string | null;

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      first(),
      switchMap(params => {
        this.code = params.get('code');
        this.scope = params.get('scope');
        return this.twitchService.callBack(this.code, this.scope);
      }),
      switchMap(tokenResponse => {
        this.accessToken = tokenResponse.access_token;
        this.refreshToken = tokenResponse.refresh_token;
        return this.authService.verifyUser();
      })
    ).subscribe((data: User) => {
        this.twitchService.saveUserData(this.accessToken, this.refreshToken, data._id).subscribe();
    });
  }

}