import { Component, Input, inject } from '@angular/core';
import { IProjectCard } from '../../../../shared/interfaces/project/project-card-interface';
import { ProjectService } from '../../../../core/services/projects/project.service';
import { IApiResponse } from '../../../../shared/interfaces/api-response-interface';
import { ButtonLinkComponent } from "../../../../shared/components/button-link/button-link.component";
import { ProjectCardComponent } from "../../../../shared/components/projects/project-card/project-card.component";

@Component({
    selector: 'app-related-projects',
    standalone: true,
    templateUrl: './related-projects.component.html',
    styles: ``,
    imports: [ButtonLinkComponent, ProjectCardComponent]
})
export class RelatedProjectsComponent {

  projects: IProjectCard[];
  @Input() currentProjectSlug: string;

  projectService: ProjectService = inject(ProjectService);

  ngOnInit(): void {
    this.onGetRelatedProjects();
  }

  onGetRelatedProjects(): void {
    this.projectService.getRelatedProjects(this.currentProjectSlug).subscribe({
      next: (res: IApiResponse<IProjectCard[]>) => this.projects = res.data
    })
  }
}
