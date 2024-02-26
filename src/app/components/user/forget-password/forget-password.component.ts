import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormElementDirective } from '../../../shared/directives/form-element.directive';
import { FieldComponent } from '../../../shared/components/form/field/field.component';
import { LabelComponent } from '../../../shared/components/form/label/label.component';
import { ErrorComponent } from '../../../shared/components/form/error/error.component';
import { ButtonComponent } from '../../../shared/components/form/button/button.component';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormElementDirective, FieldComponent, LabelComponent, ErrorComponent, ButtonComponent],
  templateUrl: './forget-password.component.html',
  styles: ``
})
export class ForgetPasswordComponent {
  fb: FormBuilder = inject(FormBuilder);
  forgetPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onForgetPassword() {
    console.log(this.forgetPasswordForm.value);
  }
}
