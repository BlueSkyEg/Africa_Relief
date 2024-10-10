import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { IProjectCard } from '../../../../shared/interfaces/project/project-card-interface';
import { ProjectService } from '../../../../core/services/projects/project.service';
import { IApiResponse } from '../../../../shared/interfaces/api-response-interface';
import { ButtonLinkComponent } from "../../../../shared/components/button-link/button-link.component";
import { ProjectCardComponent } from "../../../../shared/components/projects/project-card/project-card.component";
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-related-projects',
  standalone: true,
  templateUrl: './related-projects.component.html',
  styles: ``,
  imports: [ButtonLinkComponent, ProjectCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedProjectsComponent {
  projects: IProjectCard[];
  @Input() currentProjectSlug: string;

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

    this.onGetRelatedProjects();
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
  }
  onGetRelatedProjects(): void {
    this.projectService.getRelatedProjects(this.currentProjectSlug).subscribe({
      next: (res: IApiResponse<IProjectCard[]>) => (this.projects = res.data),
    });
  }
}
