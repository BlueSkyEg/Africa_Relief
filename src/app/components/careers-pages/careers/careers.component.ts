import { Component, OnInit, inject } from '@angular/core';
import { BreadcrumbComponent } from "../../../shared/components/breadcrumb/breadcrumb.component";
import { ICareer } from '../../../shared/interfaces/career/career.interface';
import { CareerService } from '../../../core/services/careers/career.service';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { CommonModule } from '@angular/common';
import { ButtonLinkComponent } from "../../../shared/components/button-link/button-link.component";
import { IPaginatedData } from '../../../shared/interfaces/paginated-data.interface';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
    selector: 'app-careers',
    standalone: true,
    templateUrl: './careers.component.html',
    styles: ``,
    imports: [InfiniteScrollModule, CommonModule, BreadcrumbComponent, ButtonLinkComponent]
})
export class CareersComponent implements OnInit {
  careers: ICareer[] = [];
  paginationPageNum: number = 1;
  paginationPerPage: number;
  isPaginationLastPage: boolean = false;

  careerService: CareerService = inject(CareerService);
  breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  constructor() {
    // Determine pagination perPage number based on screen size
    this.breakpointObserver
      .observe('(min-width: 800px)')
      .subscribe({
        next: (value) => this.paginationPerPage = value.matches ? 9 : 5
      })
  }

  ngOnInit(): void {
    this.onGetCareers();
  }

  onGetCareers() {
    if(!this.isPaginationLastPage) {
      this.careerService.getCareers(this.paginationPageNum, this.paginationPerPage).subscribe({
        next: (res: IApiResponse<IPaginatedData<ICareer[]>>) => {
          this.careers.push(...res.data.data);
          if(res.data.pagination.current_page === res.data.pagination.last_page) {
            this.isPaginationLastPage = true;
          }
          this.paginationPageNum++;
        }
      })
    }
  }
}
