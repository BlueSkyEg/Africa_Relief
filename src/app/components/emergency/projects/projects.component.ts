import { Component, inject } from '@angular/core';
import { IProjectCard } from '../../../shared/interfaces/project/project-card-interface';
import { ProjectService } from '../../../core/services/projects/project.service';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { IPaginatedData } from '../../../shared/interfaces/paginated-data.interface';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProjectCardComponent } from '../../../shared/components/projects/project-card/project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  imports: [InfiniteScrollModule ,ProjectCardComponent],
})
export class ProjectsComponent {
  projects: IProjectCard[] = [];
  paginationPageNum: number = 1;
  paginationPerPage: number;
  isPaginationLastPage: boolean = false;
  projectService: ProjectService = inject(ProjectService);
  ngOnInit() {
    this.onGetProjects();
  }

  onGetProjects() {
    if (this.isPaginationLastPage) {
      return;
    }

    this.projectService
      .getProjects(this.paginationPageNum, this.paginationPerPage, 'crisis')
      .subscribe({
        next: (res: IApiResponse<IPaginatedData<IProjectCard[]>>) => {
          if (res.data && res.data.data) {
            this.projects.push(...res.data.data);

            if (
              res.data.pagination.current_page === res.data.pagination.last_page
            ) {
              this.isPaginationLastPage = true;
            }

            this.paginationPageNum++;
          } else {
            console.error('Unexpected response format', res);
          }
        },
        error: (err) => {
          console.error('Error fetching projects', err);
        },
        complete: () => {
          console.log('Projects fetching completed');
        },
      });
  }
}
