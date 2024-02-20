import { Component, inject } from '@angular/core';
import { FormElementDirective } from '../../../shared/directives/form-element.directive';
import { FieldComponent } from '../../../shared/components/form/field/field.component';
import { LabelComponent } from '../../../shared/components/form/label/label.component';
import { ErrorComponent } from '../../../shared/components/form/error/error.component';
import { ButtonComponent } from '../../../shared/components/form/button/button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-become-volunteer-form-section',
  standalone: true,
  imports: [ReactiveFormsModule, FormElementDirective, FieldComponent, LabelComponent, ErrorComponent, ButtonComponent],
  templateUrl: './become-volunteer-form-section.component.html',
  styles: ``
})
export class BecomeVolunteerFormSectionComponent {
  fb: FormBuilder = inject(FormBuilder);

  becomeVolunteerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    message: ['', [Validators.required]]
  });

  onSubmit(): void {
    console.log(this.becomeVolunteerForm.value);
  }
}
