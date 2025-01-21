import {  Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';

@Component({
  selector: 'app-emergency',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    RouterLink,
    RouterLinkActive,
    ProjectsComponent,
  ],
  templateUrl: './emergency.component.html',
})
export class EmergencyComponent {

}