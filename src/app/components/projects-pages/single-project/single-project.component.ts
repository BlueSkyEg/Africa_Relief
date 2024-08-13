import { Component, OnInit, inject } from '@angular/core';
import { IProject } from '../../../shared/interfaces/project/project-interface';
import { ProjectService } from '../../../core/services/projects/project.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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

@Component({
    selector: 'app-single-project',
    standalone: true,
    templateUrl: './single-project.component.html',
    styles: ``,
    imports: [RouterModule, CommonModule, IconDirective, IconQuoteComponent, ButtonLinkComponent, BlogCardComponent, IconLinkedinComponent, IconYoutubeComponent, IconInstagramComponent, IconFacebookComponent, ShareButtonsComponent, BreadcrumbComponent, DonationCardComponent, RelatedProjectsComponent, ImgPlaceholderDirective]
})
export class SingleProjectComponent implements OnInit {
  project: IProject;
  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  projectService: ProjectService = inject(ProjectService);

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: route => {
        this.projectService.getProject(route.get('slug')).subscribe({
          next: (res: IApiResponse<IProject|null>) => {
            if(res.success) {
              this.project = res.data
            } else {
              this.router.navigate(['/404']);
            }
          }
        });
      }
    });
  }
}
