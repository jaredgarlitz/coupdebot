import { CommonModule } from "@angular/common";
import { AuthenticationService } from "../core/services/api/auth-api.service";
import { ChangeDetectionStrategy, Component, OnDestroy, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MediaMatcher } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { tap } from "rxjs";



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatListModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent{

  protected readonly fillerNav = Array.from({ length: 50}, ( _, i) => `Nav item ${i + 1}`);
  protected readonly fillerContent = Array.from(
    { length: 50 },
    () => 
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  );
  protected readonly isMobile = signal(true);
  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;


  constructor(
    private authService: AuthenticationService,
    private router: Router,
    
  ) {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  isLoggedIn = false;

  public ngOnInit() {
    if (this.authService.getAuthCookie() !== null) {
      this.isLoggedIn = true;
    }
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  public logout() {
    this.authService.removeAuth();
    this.router.navigate(['login']);
  }
  
  public navigate(route: string) {
    this.router.navigate([route]);
  }
}