import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CommandsComponent } from './commands/commands.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LiveNotificationComponent } from './live-notifications/live-notifications.component';
import { AuthenticationService, isAuthenticated } from './core/services/api/auth-api.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CallbackComponent } from './callback/callback.component';
import { TwitchConnectComponent } from './twitch-connect/twitch-connect.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'callback', component: CallbackComponent},
  { 
    path: 'commands', component: CommandsComponent,
    canActivate: [isAuthenticated]
  },
  {
    path: 'connect-twitch', component: TwitchConnectComponent,
    canActivate: [isAuthenticated]
  },
  {
    path: 'live-notifications', component: LiveNotificationComponent,
    canActivate: [isAuthenticated]
  },
  {
    path: '', component: DashboardComponent,
    canActivate: [isAuthenticated]
  }
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', component: pageNotFoundComponent }
  // path for modules?
  // path for connections/integrations?
  // path for variables?
  // path for account settings?
];
