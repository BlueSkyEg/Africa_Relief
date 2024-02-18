import { Component, OnInit, inject } from '@angular/core';
import { CategoriesFilterComponent } from "../../shared/components/categories-filter/categories-filter.component";
import { ProjectService } from '../../core/services/projects/project.service';
import { ICategory } from '../../shared/interfaces/category-interface';
import { IProjectCard } from '../../shared/interfaces/project-card-interface';
import { ProjectCardComponent } from "../../shared/components/projects/project-card/project-card.component";
import { IApiResponse } from '../../shared/interfaces/api-response-interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-projects',
    standalone: true,
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss',
    imports: [CategoriesFilterComponent, ProjectCardComponent]
})
export class ProjectsComponent implements OnInit {
  projectCategories: ICategory[];
  projects: IProjectCard[];
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  projectService: ProjectService = inject(ProjectService);

  ngOnInit(): void {
    // Get project categories
    this.projectService.getProjectCategories().subscribe({
      next: (res: IApiResponse<ICategory[]>) => this.projectCategories = res.data
    });

    // Get projects
    this.activeRoute.paramMap.subscribe({
      next: route => {
        this.projectService.getProjects(route.get('slug')).subscribe({
          next: (res: IApiResponse<IProjectCard[]>) => this.projects = res.data
        });
      }
    });
  }
}
