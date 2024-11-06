import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { IProject } from '../../../shared/interfaces/project/project-interface';
import { ProjectService } from '../../../core/services/projects/project.service';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { IconQuoteComponent } from '../../../shared/icons/quote/icon-quote.component';
import { ButtonLinkComponent } from '../../../shared/components/button-link/button-link.component';
import { BlogCardComponent } from '../../../shared/components/blogs/blog-card/blog-card.component';
import { IconLinkedinComponent } from '../../../shared/icons/social-media/linkedin/icon-linkedin.component';
import { IconYoutubeComponent } from '../../../shared/icons/social-media/youtube/icon-youtube.component';
import { IconInstagramComponent } from '../../../shared/icons/social-media/instagram/icon-instagram.component';
import { IconFacebookComponent } from '../../../shared/icons/social-media/facebook/icon-facebook.component';
import { IconDirective } from '../../../shared/directives/icon.directive';
import { ShareButtonsComponent } from '../../../shared/components/share-buttons/share-buttons.component';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { DonationCardComponent } from '../../../shared/components/donation-card/donation-card.component';
import { RelatedProjectsComponent } from './related-projects/related-projects.component';
import { ImgPlaceholderDirective } from '../../../shared/directives/img-placeholder.directive';
import { MetaService } from '../../../core/services/meta-data/meta.service';
import { filter } from 'rxjs';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-single-project',
  standalone: true,
  templateUrl: './single-project.component.html',
  styles: ``,
  imports: [
    RouterModule,
    CommonModule,
    IconDirective,
    IconQuoteComponent,
    ButtonLinkComponent,
    BlogCardComponent,
    IconLinkedinComponent,
    IconYoutubeComponent,
    IconInstagramComponent,
    IconFacebookComponent,
    ShareButtonsComponent,
    BreadcrumbComponent,
    DonationCardComponent,
    RelatedProjectsComponent,
    ImgPlaceholderDirective,
  ],
})
export class SingleProjectComponent implements OnInit {
  project: IProject;
  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  projectService: ProjectService = inject(ProjectService);
  _MetaService: MetaService = inject(MetaService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._MetaService.setCanonicalURL(window.location.href);

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this._MetaService.setCanonicalURL(window.location.href);
        });
    }
    this.activeRoute.paramMap.subscribe({
      next: (route) => {
        this.projectService.getProject(route.get('slug')).subscribe({
          next: (res: IApiResponse<IProject | null>) => {
            if (res.success) {
              this.project = res.data;

              this._MetaService.setMetaData(
                this.project.meta_data,
                this.project.created_at,
                this.project.featured_image
              );
              console.log(this.project.meta_data);
            } else {
              this.router.navigate(['/404']);
            }
          },
        });
      },
    });
  }

  formatItem(item: string): string {
    const boldPattern = /\*\*(.*?)\*\*/;

    return item
      .replace(boldPattern, '<span class="font-medium mb-1">$1</span><br>')
      .replace(/\*\*/g, '');
  }
}
