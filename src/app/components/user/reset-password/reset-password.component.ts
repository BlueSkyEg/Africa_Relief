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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormElementDirective, FieldComponent, LabelComponent, ErrorComponent, ButtonComponent, IconEyeComponent, IconEyeOffComponent],
  templateUrl: './reset-password.component.html',
  styles: ``
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordToken: string|null = null;
  showPassword: boolean = false;
  passwordStrenth: number = 0;
  fb: FormBuilder = inject(FormBuilder);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  resetPasswordForm = this.fb.group({
    password: [''],
    confirmPassword: ['']
  }, {validator: [PasswordValidator, MatchPasswordValidator]} as AbstractControlOptions)

  ngOnInit(): void {
    this.resetPasswordToken = this.activeRoute.snapshot.queryParamMap.get('token');
  }

  onResetPassword() {
    console.log(this.resetPasswordForm.controls.password.errors);
  }

  // Password Strength Indicator
  onTypePassword() {
    let password = this.resetPasswordForm.controls.password.value;
    let tempPasswordStrenth = 0;

    if (/[A-Za-z]+/.test(password)) tempPasswordStrenth++
    if (/[0-9]+/.test(password)) tempPasswordStrenth++
    if (/[!@#$%^&*()_+{}|:"<>?]+/.test(password)) tempPasswordStrenth++
    if (password.length > 8) tempPasswordStrenth++

    this.passwordStrenth = tempPasswordStrenth;
  }
}
