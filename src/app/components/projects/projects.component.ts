import { Component, OnInit } from '@angular/core';
import { CategoriesFilterComponent } from "../../shared/components/categories-filter/categories-filter.component";
import { ProjectService } from '../../core/services/projects/project.service';
import { ICategory } from '../../shared/interfaces/category-interface';
import { IProjectCard } from '../../shared/interfaces/project-card-interface';
import { ProjectCardComponent } from "../../shared/components/projects/project-card/project-card.component";

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

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjectCategories().subscribe({
      next: (value: ICategory[]) => this.projectCategories = value
    });

    this.projectService.getProjects().subscribe({
      next: (value: IProjectCard[]) => this.projects = value
    });
  }
}
