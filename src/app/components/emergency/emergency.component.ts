import { Component, inject, PLATFORM_ID } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MetaService } from '../../core/services/meta-data/meta.service';
import { isPlatformBrowser } from '@angular/common';

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
  }
}
