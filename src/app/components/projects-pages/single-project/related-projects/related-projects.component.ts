import { Component, Input, PLATFORM_ID, inject } from '@angular/core';
import { IProjectCard } from '../../../../shared/interfaces/project/project-card-interface';
import { ProjectService } from '../../../../core/services/projects/project.service';
import { IApiResponse } from '../../../../shared/interfaces/api-response-interface';
import { ButtonLinkComponent } from "../../../../shared/components/button-link/button-link.component";
import { ProjectCardComponent } from "../../../../shared/components/projects/project-card/project-card.component";
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { MetaService } from '../../../../core/services/meta-data/meta.service';

@Component({
  selector: 'app-related-projects',
  standalone: true,
  templateUrl: './related-projects.component.html',
  styles: ``,
  imports: [ButtonLinkComponent, ProjectCardComponent],
})
export class RelatedProjectsComponent {
  projects: IProjectCard[];
  @Input() currentProjectSlug: string;

  projectService: ProjectService = inject(ProjectService);
  _MetaService: MetaService = inject(MetaService);
  private platformId = inject(PLATFORM_ID);
  router: Router = inject(Router);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._MetaService.setCanonicalURL(window.location.href);

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this._MetaService.setCanonicalURL(window.location.href);
        });
    }
    this.onGetRelatedProjects();
  }

  onGetRelatedProjects(): void {
    this.projectService.getRelatedProjects(this.currentProjectSlug).subscribe({
      next: (res: IApiResponse<IProjectCard[]>) => (this.projects = res.data),
    });
  }
}
