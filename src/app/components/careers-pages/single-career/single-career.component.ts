import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from "../../../shared/components/breadcrumb/breadcrumb.component";
import { AccordionComponent } from "../../../shared/components/accordion/accordion.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldComponent } from "../../../shared/components/form/field/field.component";
import { LabelComponent } from "../../../shared/components/form/label/label.component";
import { ErrorComponent } from "../../../shared/components/form/error/error.component";
import { ButtonComponent } from "../../../shared/components/form/button/button.component";
import { ActivatedRoute } from '@angular/router';
import { ICareer } from '../../../shared/interfaces/career/career.interface';
import { CareerService } from '../../../core/services/careers/career.service';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { CommonModule } from '@angular/common';
import { FormElementDirective } from '../../../shared/directives/form-element.directive';
import { IconPaperclipComponent } from "../../../shared/icons/paperclip/icon-paperclip.component";
import { JobApplicationService } from '../../../core/services/jobApplication/job-application.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-single-career',
    standalone: true,
    templateUrl: './single-career.component.html',
    styles: ``,
    imports: [ReactiveFormsModule, CommonModule, FormElementDirective, BreadcrumbComponent, AccordionComponent, FieldComponent, LabelComponent, ErrorComponent, ButtonComponent, IconPaperclipComponent]
})
export class SingleCareerComponent {
  career: ICareer;
  jobApplicationFormDisabled: boolean = false;
  resumeName: string;
  careerService: CareerService = inject(CareerService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  fb: FormBuilder = inject(FormBuilder);
  jobApplicationService: JobApplicationService = inject(JobApplicationService);
  _snackBar: MatSnackBar = inject(MatSnackBar);

  careerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]],
    address: ['', [Validators.required]],
    resume: ['', [Validators.required]],
    coverLetter: ['', [Validators.required]],
    careerSlug: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: route => {
        this.careerService.getCareer(route.get('slug')).subscribe({
          next: (res: IApiResponse<ICareer>) => {
            this.career = res.data
            this.careerForm.controls.careerSlug.setValue(res.data.slug)
          }
        });
      }
    });
  }

  onSubmitJobApplicationForm(): void {
    this.jobApplicationFormDisabled = true;
    const formData = new FormData();
    formData.append('resume', this.careerForm.controls.resume.value);
    Object.keys(this.careerForm.controls).forEach(key => {
      formData.append(key, this.careerForm.get(key)?.value);
    });
    this.jobApplicationService.submitVolunteerForm(formData).subscribe({
      next: (res: IApiResponse) => {
        if(res.success) {
          this.careerForm.reset();
          this.resumeName = null;
          this._snackBar.open('Your application has been sent successfully.', '✖', {panelClass: 'success-snackbar'});
        } else {
          this._snackBar.open('An error occurred while sending an application.', '✖', {panelClass: 'failure-snackbar'});
        }
        this.jobApplicationFormDisabled = false;
      }
    })
  }

  onSelectResume(event) {
    const file = event.target.files[0];
    if (file) {
      this.careerForm.patchValue({resume: file});
      this.resumeName = file.name;
    }
  }
}
