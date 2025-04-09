import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthenticationService } from "../core/services/api/auth-api.service";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";

@Component({
  selector: 'dashboard-component',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardComponent {
  url = '';
  scopes = [
    'channel:bot',
    'channel:read:ads',
    'channel:manage:broadcast',
    'channel:read:charity',
    'channel:read:goals',
    'channel:manage:guest_star',
    'channel:manage:moderators',
    'channel:manage:polls',
    'channel:manage:predictions',
    'channel:manage:raids',
    'channel:read_subscriptions',
    'channel:manage:vips',
    'channel:moderate',
    'clips:edit',
    'user:bot'
  ];
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