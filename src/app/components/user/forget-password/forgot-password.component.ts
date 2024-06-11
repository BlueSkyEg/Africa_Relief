import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormElementDirective } from '../../../shared/directives/form-element.directive';
import { FieldComponent } from '../../../shared/components/form/field/field.component';
import { LabelComponent } from '../../../shared/components/form/label/label.component';
import { ErrorComponent } from '../../../shared/components/form/error/error.component';
import { ButtonComponent } from '../../../shared/components/form/button/button.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormElementDirective, FieldComponent, LabelComponent, ErrorComponent, ButtonComponent],
  templateUrl: './forgot-password.component.html',
  styles: ``
})
export class ForgotPasswordComponent {
  forgetPasswordFormDisabled: boolean = false;
  authService: AuthService = inject(AuthService);
  fb: FormBuilder = inject(FormBuilder);
  _snackBar: MatSnackBar = inject(MatSnackBar);

  forgetPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]]
  });

  onForgetPassword() {
    this.forgetPasswordFormDisabled = true;
    this.authService.forgotPassword(this.forgetPasswordForm.value).subscribe({
      next: res => {
        if(res.success) {
          this._snackBar.open('Email sent! Check your inbox.', '✖', {panelClass: 'success-snackbar'});
          this.forgetPasswordForm.reset();
        } else if(res.message == 'validation error') {
          this.forgetPasswordForm.controls.email.setErrors({serverError: res.errors['email'][0]});
        } else {
          this._snackBar.open(res.message, '✖', {panelClass: 'failure-snackbar'});
        }
        this.forgetPasswordFormDisabled = false;
      }
    })
  }
}
