import { Component, inject } from '@angular/core';
import { AbstractControlOptions, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormElementDirective } from '../../shared/directives/form-element.directive';
import { FieldComponent } from '../../shared/components/form/field/field.component';
import { LabelComponent } from '../../shared/components/form/label/label.component';
import { ErrorComponent } from '../../shared/components/form/error/error.component';
import { ButtonComponent } from '../../shared/components/form/button/button.component';
import { IconEyeComponent } from '../../shared/icons/eye/icon-eye.component';
import { IconEyeOffComponent } from '../../shared/icons/eye-off/icon-eye-off.component';
import { PasswordValidator } from '../../core/validators/password.validator';
import { MatchPasswordValidator } from '../../core/validators/match-password.validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormElementDirective, FieldComponent, LabelComponent, ErrorComponent, ButtonComponent, IconEyeComponent, IconEyeOffComponent],
  templateUrl: './signup.component.html',
  styles: ``
})
export class SignupComponent {
  showPassword: boolean = false;
  fb: FormBuilder = inject(FormBuilder);

  signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    passwords: this.fb.group({
      password: [''],
      confirmPassword: ['']
    }, {validator: [PasswordValidator, MatchPasswordValidator]} as AbstractControlOptions)
  });

  get password() {
    return this.signupForm.controls.passwords.get('password');
  }

  get confirmPassword() {
    return this.signupForm.controls.passwords.get('confirmPassword');
  }

  onSignup() {
    console.log(this.signupForm.value);
  }
}
