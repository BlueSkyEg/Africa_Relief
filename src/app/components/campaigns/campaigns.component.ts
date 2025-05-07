import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { IconCowComponent } from "../../shared/icons/cows/icon-cow.component";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IconSheepComponent } from "../../shared/icons/sheep/icon-sheep.component";
import { IconMeatComponent } from "../../shared/icons/meat/icon-meat.component";
import { IconCowTwoComponent } from "../../shared/icons/cows/icon-cow-2.component";
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { DonationCardComponent } from "../../shared/components/donation-card/donation-card.component";
import { IProject } from '../../shared/interfaces/project/project-interface';
import { ProjectService } from '../../core/services/projects/project.service';
import { MetaService } from '../../core/services/meta-data/meta.service';
import { IApiResponse } from '../../shared/interfaces/api-response-interface';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [BreadcrumbComponent, IconCowComponent, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, IconSheepComponent, IconMeatComponent,
    IconCowTwoComponent,
    RouterLink,
    DonationCardComponent,
  ],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss'
})
export class CampaignsComponent {

  countries: string[] = [
    'Benin',
    'Burundi',
    'Cameroon',
    'Chad',
    'Djibouti',
    'Ethiopia',
    'Gambia',
    'Ghana',
    'Guinea-Bissau',
    'Guinea-Conakry',
    'Ivory Coast',
    'Kenya',
    'Liberia',
    'Madagascar',
    'Malawi',
    'Mali',
    'Mozambique',
    'Niger',
    'Nigeria',
    'Rwanda',
    'Senegal',
    'Sierra Leone',
    'Somalia',
    'Sudan',
    'Tanzania',
    'Togo',
    'Uganda',
    'Zanzibar',

  ];


  project: IProject;
  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  projectService: ProjectService = inject(ProjectService);
  metaService: MetaService = inject(MetaService);

  ngOnInit(): void {
    this.getProject();
  }

  getProject() {
    this.projectService.getProject('qurbani-udhiya').subscribe({
      next: (res: IApiResponse<IProject | null>) => {
        if (res.success) {
          console.log(res.data);
          this.project = res.data;

          this.metaService.setMetaData(
            this.project.meta_data,
            this.project.created_at,
            this.project.featured_image
          );
        } else {
          this.router.navigate(['/404']);
        }
      },
      error: (err) => {
        console.error('Error fetching project:', err);
        this.router.navigate(['/404']);
      }
    });
  }
}
