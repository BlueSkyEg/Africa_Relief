import { Component, OnInit, inject } from '@angular/core';
import { BreadcrumbComponent } from "../../../shared/components/breadcrumb/breadcrumb.component";
import { ICareer } from '../../../shared/interfaces/career.interface';
import { CareerService } from '../../../core/services/careers/career.service';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { CommonModule } from '@angular/common';
import { ButtonLinkComponent } from "../../../shared/components/button-link/button-link.component";

@Component({
    selector: 'app-careers',
    standalone: true,
    templateUrl: './careers.component.html',
    styles: ``,
    imports: [CommonModule, BreadcrumbComponent, ButtonLinkComponent]
})
export class CareersComponent implements OnInit {
  careers: ICareer[];
  careerService: CareerService = inject(CareerService);

  ngOnInit(): void {
    this.careerService.getCareers().subscribe({
      next: (res: IApiResponse<ICareer[]>) => this.careers = res.data
    })
  }
}
