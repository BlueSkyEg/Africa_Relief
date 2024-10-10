import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { IProject } from '../../../shared/interfaces/project/project-interface';
import { ProjectService } from '../../../core/services/projects/project.service';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { CommonModule } from '@angular/common';
import { IconQuoteComponent } from "../../../shared/icons/quote/icon-quote.component";
import { ButtonLinkComponent } from "../../../shared/components/button-link/button-link.component";
import { BlogCardComponent } from "../../../shared/components/blogs/blog-card/blog-card.component";
import { IconLinkedinComponent } from "../../../shared/icons/social-media/linkedin/icon-linkedin.component";
import { IconYoutubeComponent } from "../../../shared/icons/social-media/youtube/icon-youtube.component";
import { IconInstagramComponent } from "../../../shared/icons/social-media/instagram/icon-instagram.component";
import { IconFacebookComponent } from "../../../shared/icons/social-media/facebook/icon-facebook.component";
import { IconDirective } from '../../../shared/directives/icon.directive';
import { ShareButtonsComponent } from "../../../shared/components/share-buttons/share-buttons.component";
import { BreadcrumbComponent } from "../../../shared/components/breadcrumb/breadcrumb.component";
import { DonationCardComponent } from "../../../shared/components/donation-card/donation-card.component";
import { RelatedProjectsComponent } from "./related-projects/related-projects.component";
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
  metaService: MetaService = inject(MetaService);
  _metaService: Meta = inject(Meta);

  ngOnInit(): void {
    this.setCanonicalURL(window.location.href);

    // Update the canonical URL on route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setCanonicalURL(window.location.href);
      });

    this.activeRoute.paramMap.subscribe({
      next: (route) => {
        this.projectService.getProject(route.get('slug')).subscribe({
          next: (res: IApiResponse<IProject | null>) => {
            if (res.success) {
              this.project = res.data;

              this.metaService.setMetaData(
                this.project.meta_data,
                this.project.created_at
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
    this._metaService.updateTag({
      property: 'og:url',
      content: url,
    });
  }
  formatItem(item: string): string {
    const boldPattern = /\*\*(.*?)\*\*/;

    return item
      .replace(boldPattern, '<span class="font-medium mb-1">$1</span><br>')
      .replace(/\*\*/g, '');
  }
}
