import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IProjectCard } from '../../../shared/interfaces/project/project-card-interface';
import { ProjectService } from '../../../core/services/projects/project.service';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { IPaginatedData } from '../../../shared/interfaces/paginated-data.interface';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProjectCardComponent } from '../../../shared/components/projects/project-card/project-card.component';
import { ButtonLinkComponent } from '../../../shared/components/button-link/button-link.component';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  imports: [InfiniteScrollModule, ProjectCardComponent, ButtonLinkComponent],
})
export class ProjectsComponent {
  projects: IProjectCard[] = [];
  paginationPageNum: number = 1;
  paginationPerPage: number;
  isPaginationLastPage: boolean = false;
  loading: boolean = false;
  projectService: ProjectService = inject(ProjectService);
  metaService: Meta = inject(Meta);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.setCanonicalURL(window.location.href);

    // Update the canonical URL on route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setCanonicalURL(window.location.href);
      });
  }
  setCanonicalURL(url: string) {
    let link: HTMLLinkElement =
      document.querySelector("link[rel='canonical']") || null;

    if (link) {
      link.setAttribute('href', url);
    } else {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      document.head.appendChild(link);
    }
    // Set og:url
    this.metaService.updateTag({
      property: 'og:url',
      content: url,
    });
    this.onGetProjects();
  }
  onGetProjects() {
    if (!this.isPaginationLastPage && !this.loading) {
      this.loading = true;
      this.projectService
        .getProjects(this.paginationPageNum, this.paginationPerPage, 'crisis')
        .subscribe({
          next: (res: IApiResponse<IPaginatedData<IProjectCard[]>>) => {
            if (res.data && res.data.data) {
              this.projects.push(...res.data.data);

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
            console.error('Error fetching blogs', err);
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
  }
}
