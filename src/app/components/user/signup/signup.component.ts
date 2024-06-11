import { Component, inject } from '@angular/core';
import { AbstractControlOptions, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormElementDirective } from '../../../shared/directives/form-element.directive';
import { FieldComponent } from '../../../shared/components/form/field/field.component';
import { LabelComponent } from '../../../shared/components/form/label/label.component';
import { ErrorComponent } from '../../../shared/components/form/error/error.component';
import { ButtonComponent } from '../../../shared/components/form/button/button.component';
import { IconEyeComponent } from '../../../shared/icons/eye/icon-eye.component';
import { IconEyeOffComponent } from '../../../shared/icons/eye-off/icon-eye-off.component';
import { PasswordValidator } from '../../../core/validators/password.validator';
import { MatchPasswordValidator } from '../../../core/validators/match-password.validator';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styles: ``,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FormElementDirective, FieldComponent, LabelComponent, ErrorComponent, ButtonComponent, IconEyeComponent, IconEyeOffComponent]
})
export class SignupComponent {
  showPassword: boolean = false;
  signupFormDisabled: boolean = false;
  passwordStrenth: number = 0;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  _snackBar: MatSnackBar = inject(MatSnackBar);

  signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]],
    password: [''],
    password_confirmation: ['']
  }, {validator: [PasswordValidator, MatchPasswordValidator]} as AbstractControlOptions)

  onSignup() {
    this.signupFormDisabled = true;
    this.authService.register(this.signupForm.value).subscribe({
      next: res => {
        if(res.success) {
          this.authService.authedUserSubject.next(res.data.user);
          localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
          localStorage.setItem('tokenExpiresAt', JSON.stringify(res.data.tokenExpiresAt));
          this.authService.checkRedirectUrl(this.activeRoute);
        } else if(res.message == 'validation error') {
          for (const control in res.errors) {
            this.signupForm.get(control).setErrors({ serverError: res.errors[control][0] });
          }
        } else {
          this._snackBar.open(res.message, '✖', {panelClass: 'failure-snackbar'});
        }
        this.signupFormDisabled = false;
      }
    })
  }

  // Password Strength Indicator
  onTypePassword() {
    let password = this.signupForm.controls.password.value;
    let tempPasswordStrenth = 0;

    if (/[a-z]+/.test(password)) tempPasswordStrenth++
    if (/^(?=.*[0-9])(?=.*[A-Z]).+$/.test(password)) tempPasswordStrenth++
    if (/[!@#$%^&*()_+{}|:"<>?]+/.test(password)) tempPasswordStrenth++
    if (password.length > 8) tempPasswordStrenth++

    this.passwordStrenth = tempPasswordStrenth;
  }
}
