import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FieldComponent } from "../../../shared/components/form/field/field.component";
import { LabelComponent } from "../../../shared/components/form/label/label.component";
import { FormElementDirective } from '../../../shared/directives/form-element.directive';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorComponent } from "../../../shared/components/form/error/error.component";
import { ButtonComponent } from "../../../shared/components/form/button/button.component";
import { IconEyeComponent } from "../../../shared/icons/eye/icon-eye.component";
import { IconEyeOffComponent } from "../../../shared/icons/eye-off/icon-eye-off.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailValidator } from '../../../core/validators/email.validator';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styles: ``,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormElementDirective,
    FieldComponent,
    LabelComponent,
    ErrorComponent,
    ButtonComponent,
    IconEyeComponent,
    IconEyeOffComponent,
  ],
})
export class LoginComponent {
  loginFormDisabled: boolean = false;
  showPassword: boolean = false;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  platformId = inject(PLATFORM_ID);
  authService: AuthService = inject(AuthService);
  fb: FormBuilder = inject(FormBuilder);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  // accessDonorDashboardForm = this.fb.group({
  //   email: ['', [Validators.required, Validators.email]]
  // });

  loginForm = this.fb.group({
    email: ['', [Validators.required, EmailValidator()]],
    password: ['', [Validators.required, Validators.minLength]],
  });

  // onAccessDonorDashboard() {
  //   console.log(this.accessDonorDashboardForm.value);
  // }

  // reset email errors when change form fields
  resetErrorsAndEnableForm(): void {
    this.loginForm.valueChanges.subscribe(() => {
      this.loginForm.controls.email.setErrors(null);
    });
  }

  onLogin() {
    this.loginFormDisabled = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.authService.authedUserSubject.next(res.data.user);
            if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(
            'accessToken',
            JSON.stringify(res.data.accessToken)
          );
          localStorage.setItem(
            'tokenExpiresAt',
            JSON.stringify(res.data.tokenExpiresAt)
          );
        }
          this.authService.checkRedirectUrl(this.activeRoute);
        } else if (res.message == 'validation error') {
          this.loginForm.controls.email.setErrors({
            serverError: res.errors['email'][0],
          });
          this.resetErrorsAndEnableForm();
        } else {
          this._snackBar.open(res.message, '✖', {
            panelClass: 'failure-snackbar',
          });
        }
        this.loginFormDisabled = false;
      },
    });
  }
}
