import {
  Component,
  inject,
  ChangeDetectionStrategy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { ProjectCategoriesSliderComponent } from '../../shared/components/projects/project-categories-slider/project-categories-slider.component';
import { SafeAndEasyDonationComponent } from '../../shared/components/safe-and-easy-donation/safe-and-easy-donation.component';
import { BecomeVolunteerComponent } from '../../shared/components/become-volunteer/become-volunteer.component';
import { IconArrowDownRightComponent } from '../../shared/icons/arrows/arrow-down-right/icon-arrow-down-right.component';
import { JourneyTimeLineSliderComponent } from './journey-timeline-slider/journey-timeline-slider.component';
import { IconPdfComponent } from '../../shared/icons/pdf/icon-pdf.component';
import { IconDownloadComponent } from '../../shared/icons/download/icon-download.component';
import { BoardMembersSliderComponent } from './board-members-slider/board-members-slider.component';
import { ImgPlaceholderDirective } from '../../shared/directives/img-placeholder.directive';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { MetaService } from '../../core/services/meta-data/meta.service';
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
  _MetaService: MetaService = inject(MetaService);
  router: Router = inject(Router);
  isBrowser: boolean;
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
  }
}
