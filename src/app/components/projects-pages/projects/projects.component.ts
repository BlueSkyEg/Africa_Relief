import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CategoriesFilterComponent } from '../../../shared/components/categories-filter/categories-filter.component';
import { ProjectService } from '../../../core/services/projects/project.service';
import { ICategory } from '../../../shared/interfaces/category-interface';
import { IProjectCard } from '../../../shared/interfaces/project/project-card-interface';
import { ProjectCardComponent } from '../../../shared/components/projects/project-card/project-card.component';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BreakpointObserver } from '@angular/cdk/layout';
import { IPaginatedData } from '../../../shared/interfaces/paginated-data.interface';
import { MetaService } from '../../../core/services/meta-data/meta.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styles: ``,
  imports: [
    InfiniteScrollModule,
    CategoriesFilterComponent,
    ProjectCardComponent,
    BreadcrumbComponent,
  ],
})
export class ProjectsComponent implements OnInit {
  projectCategories: ICategory[];
  projects: IProjectCard[] = [];
  paginationPageNum: number = 1;
  paginationPerPage: number;
  isPaginationLastPage: boolean = false;
  loading: boolean = false;

  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  projectService: ProjectService = inject(ProjectService);
  breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  metaService: MetaService = inject(MetaService);

  constructor() {
    // Determine pagination perPage number based on screen size
    this.breakpointObserver.observe('(min-width: 800px)').subscribe({
      next: (value) => (this.paginationPerPage = value.matches ? 9 : 5),
    });
  }

  ngOnInit(): void {
    this.projectService.getProjectCategories().subscribe({
      next: (res: IApiResponse<ICategory[]>) => {
        this.projectCategories = res.data;
        console.log(this.projectCategories)
      },
    });

    this.activeRoute.paramMap.subscribe({
      next: (params) => {
        const currentSlug = params.get('slug');
        this.resetPagination();
        this.onGetProject(currentSlug);
        this.onGetProjects();
      },
    });
  }
  resetPagination(): void {
    this.isPaginationLastPage = false;
    this.paginationPageNum = 1;
    this.projects = [];
  }
  onGetProject(currentSlug: string) {
    if (currentSlug) {
      const matchingCategory = this.projectCategories?.find(
        (category) => category.slug === currentSlug
      );
      if (matchingCategory) {
        this.metaService.setMetaData(matchingCategory.meta_data);
      }
    }
  }

  onGetProjects() {
    if (!this.isPaginationLastPage && !this.loading) {
      this.loading = true;
      const categorySlug = this.activeRoute.snapshot.paramMap.get('slug');
      this.projectService
        .getProjects(
          this.paginationPageNum,
          this.paginationPerPage,
          categorySlug
        )
        .subscribe({
          next: (res: IApiResponse<IPaginatedData<IProjectCard[]>>) => {
            if (res.data && res.data.data) {
              this.projects.push(...res.data.data);
              this.onGetProject(categorySlug);

              if (
                res.data.pagination.current_page < res.data.pagination.last_page
              ) {
                this.paginationPageNum++;
              } else {
                this.isPaginationLastPage = true;
              }
            }
          },
          error: (err) => {
            console.error('Error loading projects:', err);
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
  }
}
