import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from "../../../shared/components/breadcrumb/breadcrumb.component";
import { AccordionComponent } from "../../../shared/components/accordion/accordion.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldComponent } from "../../../shared/components/form/field/field.component";
import { LabelComponent } from "../../../shared/components/form/label/label.component";
import { ErrorComponent } from "../../../shared/components/form/error/error.component";
import { ButtonComponent } from "../../../shared/components/form/button/button.component";
import { ActivatedRoute } from '@angular/router';
import { ICareer } from '../../../shared/interfaces/career.interface';
import { CareerService } from '../../../core/services/careers/career.service';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { CommonModule } from '@angular/common';
import { FormElementDirective } from '../../../shared/directives/form-element.directive';
import { IconPaperclipComponent } from "../../../shared/icons/paperclip/icon-paperclip.component";

@Component({
    selector: 'app-single-career',
    standalone: true,
    templateUrl: './single-career.component.html',
    styles: ``,
    imports: [ReactiveFormsModule, CommonModule, FormElementDirective, BreadcrumbComponent, AccordionComponent, FieldComponent, LabelComponent, ErrorComponent, ButtonComponent, IconPaperclipComponent]
})
export class SingleCareerComponent {
  career: ICareer;
  careerService: CareerService = inject(CareerService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  fb: FormBuilder = inject(FormBuilder);

  careerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    resume: ['', []],
    message: ['', [Validators.required]],
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

  onApplyJob() {
    console.log(this.careerForm.controls.resume);
  }
}