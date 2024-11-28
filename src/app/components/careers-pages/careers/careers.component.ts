import {  Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { ICareer } from '../../../shared/interfaces/career/career.interface';
import { CareerService } from '../../../core/services/careers/career.service';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonLinkComponent } from '../../../shared/components/button-link/button-link.component';
import { IPaginatedData } from '../../../shared/interfaces/paginated-data.interface';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ImgPlaceholderDirective } from '../../../shared/directives/img-placeholder.directive';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MetaService } from '../../../core/services/meta-data/meta.service';

@Component({
  selector: 'app-careers',
  standalone: true,
  templateUrl: './careers.component.html',
  styles: ``,
  imports: [
    InfiniteScrollModule,
    CommonModule,
    BreadcrumbComponent,
    ButtonLinkComponent,
    ImgPlaceholderDirective,
  ],
})
export class CareersComponent implements OnInit {
  careers: ICareer[] = [];
  paginationPageNum: number = 1;
  paginationPerPage: number;
  isPaginationLastPage: boolean = false;
  loading: boolean = false;
  careerService: CareerService = inject(CareerService);
  breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  _MetaService: MetaService = inject(MetaService);
  private platformId = inject(PLATFORM_ID);
  router: Router = inject(Router);
  constructor() {
    // Determine pagination perPage number based on screen size
    this.breakpointObserver.observe('(min-width: 800px)').subscribe({
      next: (value) => (this.paginationPerPage = value.matches ? 9 : 5),
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._MetaService.setCanonicalURL(window.location.href);

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this._MetaService.setCanonicalURL(window.location.href);
        });
    }
    this.onGetCareers();
  }

  onGetCareers() {
    if (!this.isPaginationLastPage && !this.loading) {
      this.loading = true;
      this.careerService
        .getCareers(this.paginationPageNum, this.paginationPerPage)
        .subscribe({
          next: (res: IApiResponse<IPaginatedData<ICareer[]>>) => {
            const newCareers = res.data.data;

            // Use Set to store only unique careers
            const careersSet = new Set([...this.careers, ...newCareers]);

            this.careers = Array.from(careersSet);

            if (
              res.data.pagination.current_page < res.data.pagination.last_page
            ) {
              this.paginationPageNum++;
            } else {
              this.isPaginationLastPage = true;
            }
          },
          error: (err) => {
            console.error('Error fetching blogs', err);
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
  }
}
