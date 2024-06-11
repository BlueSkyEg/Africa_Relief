import { Component, OnInit, inject } from '@angular/core';
import { AbstractControlOptions, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormElementDirective, FieldComponent, LabelComponent, ErrorComponent, ButtonComponent, IconEyeComponent, IconEyeOffComponent],
  templateUrl: './reset-password.component.html',
  styles: ``
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordFormDisabled: boolean = false;
  showPassword: boolean = false;
  authService: AuthService = inject(AuthService);
  fb: FormBuilder = inject(FormBuilder);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  _snackBar: MatSnackBar = inject(MatSnackBar);

  resetPasswordForm = this.fb.group({
    token: [null],
    email: [null],
    password: [''],
    password_confirmation: ['']
  }, {validator: [PasswordValidator, MatchPasswordValidator]} as AbstractControlOptions)

  ngOnInit(): void {
    const queryParams = this.activeRoute.snapshot.queryParamMap;
    this.resetPasswordForm.controls.token.setValue(queryParams.get('token'));
    this.resetPasswordForm.controls.email.setValue(queryParams.get('email'));
  }

  onResetPassword() {
    this.resetPasswordFormDisabled = true;
    this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: res => {
        if(res.success) {
          this._snackBar.open('Password reseted successfully', 'close');
          this.router.navigateByUrl('/login');
        } else if (res.message == 'validation error') {
          this.resetPasswordForm.controls.password.setErrors({serverError: res.errors[0][0]});
        } else {
          this._snackBar.open(res.message, '✖', {panelClass: 'failure-snackbar'});
        }
        this.resetPasswordFormDisabled = false;
      }
    })
  }

  // Password Strength Indicator
  passwordStrenth: number = 0;

  onTypePassword() {
    let password = this.resetPasswordForm.controls.password.value;
    let tempPasswordStrenth = 0;

    if (/[a-z]+/.test(password)) tempPasswordStrenth++
    if (/^(?=.*[0-9])(?=.*[A-Z]).+$/.test(password)) tempPasswordStrenth++
    if (/[!@#$%^&*()_+{}|:"<>?]+/.test(password)) tempPasswordStrenth++
    if (password.length > 8) tempPasswordStrenth++

    this.passwordStrenth = tempPasswordStrenth;
  }
}
