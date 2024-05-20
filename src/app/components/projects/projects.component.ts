import { Component, OnInit, inject } from '@angular/core';
import { CategoriesFilterComponent } from "../../shared/components/categories-filter/categories-filter.component";
import { ProjectService } from '../../core/services/projects/project.service';
import { ICategory } from '../../shared/interfaces/category-interface';
import { IProjectCard } from '../../shared/interfaces/project/project-card-interface';
import { ProjectCardComponent } from "../../shared/components/projects/project-card/project-card.component";
import { IApiResponse } from '../../shared/interfaces/api-response-interface';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BreakpointObserver } from '@angular/cdk/layout';
import { IPaginatedData } from '../../shared/interfaces/paginated-data.interface';

@Component({
    selector: 'app-projects',
    standalone: true,
    templateUrl: './projects.component.html',
    styles: ``,
    imports: [InfiniteScrollModule, CategoriesFilterComponent, ProjectCardComponent, BreadcrumbComponent]
})
export class ProjectsComponent implements OnInit {
  projectCategories: ICategory[];
  projects: IProjectCard[] = [];
  paginationPageNum: number = 1;
  paginationPerPage: number;
  isPaginationLastPage: boolean = false;

  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  projectService: ProjectService = inject(ProjectService);
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
    // Get project categories
    this.projectService.getProjectCategories().subscribe({
      next: (res: IApiResponse<ICategory[]>) => this.projectCategories = res.data
    });

    // Get projects
    this.activeRoute.paramMap.subscribe({
      next: () => {
        this.isPaginationLastPage = false;
        this.paginationPageNum = 1;
        this.projects = [];
        this.onGetProjects();
      }
    });
  }


  onGetProjects() {
    if(!this.isPaginationLastPage) {
      const categorySlug = this.activeRoute.snapshot.paramMap.get('slug');
      this.projectService.getProjects(this.paginationPageNum, this.paginationPerPage, categorySlug).subscribe({
        next: (res: IApiResponse<IPaginatedData<IProjectCard[]>>) => {
          this.projects.push(...res.data.data);
          if(res.data.pagination.current_page === res.data.pagination.last_page) {
            this.isPaginationLastPage = true;
          }
          this.paginationPageNum++;
        }
      });
    }
  }
}
