import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { IconPinComponent } from "../../shared/icons/pin/icon-pin.component";
import { IconEnvelopeComponent } from "../../shared/icons/envelope/icon-envelope.component";
import { IconPhoneComponent } from "../../shared/icons/phone/icon-phone.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormElementDirective } from '../../shared/directives/form-element.directive';
import { FieldComponent } from '../../shared/components/form/field/field.component';
import { LabelComponent } from '../../shared/components/form/label/label.component';
import { ErrorComponent } from '../../shared/components/form/error/error.component';
import { ButtonComponent } from '../../shared/components/form/button/button.component';

@Component({
    selector: 'app-contact',
    standalone: true,
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
    imports: [ReactiveFormsModule, FormElementDirective, FieldComponent, LabelComponent, ErrorComponent, ButtonComponent, BreadcrumbComponent, IconPinComponent, IconEnvelopeComponent, IconPhoneComponent]
})
export class ContactComponent {
  fb: FormBuilder = inject(FormBuilder);

  contactForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    message: ['', [Validators.required]]
  });

  onSubmit(): void {
    console.log(this.contactForm.value);
  }
}
