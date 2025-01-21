import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { ContactService } from '../../core/services/contact/contact.service';
import { IApiResponse } from '../../shared/interfaces/api-response-interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StringValidator } from '../../core/validators/string.validator';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styles: ``,
  imports: [
    ReactiveFormsModule,
    FormElementDirective,
    FieldComponent,
    LabelComponent,
    ErrorComponent,
    ButtonComponent,
    BreadcrumbComponent,
    IconPinComponent,
    IconEnvelopeComponent,
    IconPhoneComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  contactFormDisabled: boolean = false;
  fb: FormBuilder = inject(FormBuilder);
  contactService: ContactService = inject(ContactService);
  _snackBar: MatSnackBar = inject(MatSnackBar);

  contactForm = this.fb.group({
    name: ['', [Validators.required, StringValidator()]],
    email: ['', [Validators.required, Validators.email]],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        ),
      ],
    ],
    address: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  onSubmitContactForm(): void {
    this.contactFormDisabled = true;
    this.contactService
      .submitContactForm(this.contactForm.getRawValue())
      .subscribe({
        next: (res: IApiResponse<null>) => {
          if (res.success) {
            this.contactForm.reset();
            this._snackBar.open(
              'Your message has been sent successfully.',
              '✖',
              { panelClass: 'success-snackbar' }
            );
          } else {
            this._snackBar.open(
              'An error occurred while sending a message.',
              '✖',
              { panelClass: 'failure-snackbar' }
            );
          }
          this.contactFormDisabled = false;
        },
      });
  }
}
