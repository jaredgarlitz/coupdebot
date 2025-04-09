import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Validators } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { AuthenticationService } from "../core/services/api/auth-api.service";

import { LoginApiService } from  '../core/services/api/login-api.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignUpComponent{
  email = '';
  password = '';
  isFormInvalid = true;

  token = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginApiService,
    private authService: AuthenticationService) {}

    signUpFormControls = {
      email: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      userName: this.fb.control('', Validators.required)
    }

    signUpForm = this.fb.group(this.signUpFormControls);

  onSubmit() {
    this.loginService.registerUser(
      this.signUpForm.controls.email.value,
      this.signUpForm.controls.password.value,
      this.signUpForm.controls.firstName.value,
      this.signUpForm.controls.lastName.value,
      this.signUpForm.controls.userName.value
    ).subscribe(
      response => {
        this.token = response.token;
        this.authService.setAuthCookie(this.token);
      });

      return;
  }
}