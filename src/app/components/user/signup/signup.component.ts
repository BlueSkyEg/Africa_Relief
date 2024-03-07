import { Component, inject } from '@angular/core';
import { AbstractControlOptions, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
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

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styles: ``,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FormElementDirective, FieldComponent, LabelComponent, ErrorComponent, ButtonComponent, IconEyeComponent, IconEyeOffComponent]
})
export class SignupComponent {
  showPassword: boolean = false;
  passwordStrenth: number = 0;
  fb: FormBuilder = inject(FormBuilder);

  signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    confirm_password: ['']
  }, {validator: [PasswordValidator, MatchPasswordValidator]} as AbstractControlOptions)

  onSignup() {
    console.log(this.signupForm.controls.password.errors);
  }

  // Password Strength Indicator
  onTypePassword() {
    let password = this.signupForm.controls.password.value;
    let tempPasswordStrenth = 0;

    if (/[A-Za-z]+/.test(password)) tempPasswordStrenth++
    if (/[0-9]+/.test(password)) tempPasswordStrenth++
    if (/[!@#$%^&*()_+{}|:"<>?]+/.test(password)) tempPasswordStrenth++
    if (password.length > 8) tempPasswordStrenth++

    this.passwordStrenth = tempPasswordStrenth;
  }
}
