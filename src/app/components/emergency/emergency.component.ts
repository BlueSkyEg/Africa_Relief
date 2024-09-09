import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { ButtonLinkComponent } from '../../shared/components/button-link/button-link.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';


@Component({
  selector: 'app-emergency',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    ButtonLinkComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ProjectsComponent
  ],
  templateUrl: './emergency.component.html',
})
export class EmergencyComponent {}