import { Component, inject } from '@angular/core';
import { FormElementDirective } from '../../../shared/directives/form-element.directive';
import { FieldComponent } from '../../../shared/components/form/field/field.component';
import { LabelComponent } from '../../../shared/components/form/label/label.component';
import { ErrorComponent } from '../../../shared/components/form/error/error.component';
import { ButtonComponent } from '../../../shared/components/form/button/button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VolunteerService } from '../../../core/services/volunteer/volunteer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { StringValidator } from '../../../core/validators/string.validator';

@Component({
    selector: 'app-become-volunteer-form-section',
    standalone: true,
    templateUrl: './become-volunteer-form-section.component.html',
    styles: ``,
    imports: [ReactiveFormsModule, FormElementDirective, FieldComponent, LabelComponent, ErrorComponent, ButtonComponent]
})
export class BecomeVolunteerFormSectionComponent {
  volunteerFormDisabled: boolean = false;
  fb: FormBuilder = inject(FormBuilder);
  volunteerService: VolunteerService = inject(VolunteerService);
  _snackBar: MatSnackBar = inject(MatSnackBar);

  becomeVolunteerForm = this.fb.group({
    name: ['', [Validators.required, StringValidator()]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]],
    address: ['', [Validators.required]],
    message: ['', [Validators.required]]
  });

  onSubmitVolunteerForm(): void {
    this.volunteerFormDisabled = true;
    this.volunteerService.submitVolunteerForm(this.becomeVolunteerForm.getRawValue()).subscribe({
      next: (res: IApiResponse<null>) => {
        if(res.success) {
          this.becomeVolunteerForm.reset();
          this._snackBar.open('Your message has been sent successfully.', '✖', {panelClass: 'success-snackbar'});
        } else {
          this._snackBar.open('An error occurred while sending a message.', '✖', {panelClass: 'failure-snackbar'});
        }
        this.volunteerFormDisabled = false;
      }
    })
  }
}
