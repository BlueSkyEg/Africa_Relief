import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { ProjectCategoriesSliderComponent } from "../../shared/components/projects/project-categories-slider/project-categories-slider.component";
import { SafeAndEasyDonationComponent } from "../../shared/components/safe-and-easy-donation/safe-and-easy-donation.component";
import { BecomeVolunteerComponent } from "../../shared/components/become-volunteer/become-volunteer.component";
import { IconArrowDownRightComponent } from "../../shared/icons/arrows/arrow-down-right/icon-arrow-down-right.component";
import { JourneyTimeLineSliderComponent } from "./journey-timeline-slider/journey-timeline-slider.component";
import { IconPdfComponent } from "../../shared/icons/pdf/icon-pdf.component";
import { IconDownloadComponent } from "../../shared/icons/download/icon-download.component";
import { BoardMembersSliderComponent } from "./board-members-slider/board-members-slider.component";
import { ImgPlaceholderDirective } from '../../shared/directives/img-placeholder.directive';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styles: ``,
  imports: [
    BreadcrumbComponent,
    ProjectCategoriesSliderComponent,
    SafeAndEasyDonationComponent,
    BecomeVolunteerComponent,
    IconArrowDownRightComponent,
    JourneyTimeLineSliderComponent,
    IconPdfComponent,
    IconDownloadComponent,
    BoardMembersSliderComponent,
    ImgPlaceholderDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  metaService: Meta = inject(Meta);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.setCanonicalURL(window.location.href);

    // Update the canonical URL on route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setCanonicalURL(window.location.href);
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
    this.metaService.updateTag({
      property: 'og:url',
      content: url,
    });
  }
}
