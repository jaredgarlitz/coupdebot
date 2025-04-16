import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Observable, switchMap, tap } from 'rxjs';
import { AuthenticationService, setAuthCookie, isAuthenticated } from '../core/services/api/auth-api.service';
import { Router } from '@angular/router';

import { Login } from './login';
import { LoginApiService } from '../core/services/api/login-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent{
  email = '';
  password = '';
  isFormInvalid = true;

  token = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginApiService,
    private authService: AuthenticationService,
    private router: Router) {}

  loginFormControls = {
    email: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required)
  }

  loginForm = this.fb.group(this.loginFormControls);


  ngOnInit() {
    this.authService.verifyUser()?.pipe(tap(
      x => {
        if (x._id) {
          this.router.navigate(['']);
        }
      }
    )).subscribe();
  }

  onSubmit() {
    this.loginService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(
      response => {
        this.token = response.token;
        setAuthCookie(this.token);
        this.router.navigate([]).then(() => {
          window.location.reload();
        });
      });
      return;
  }

  get name() {
    return this.loginForm.get('email');
  }

  get skill() {
    return this.loginForm.get('password');
  }
}
