import { Component, inject } from '@angular/core';
import { MainSliderComponent } from './main-slider/main-slider.component';
import { ProjectCategoriesSliderComponent } from '../../shared/components/projects/project-categories-slider/project-categories-slider.component';
import { ProjectsSliderSectionComponent } from './projects-slider-section/projects-slider-section.component';
import { PartnersSliderComponent } from './partners-slider/partners-slider.component';
import { SafeAndEasyDonationComponent } from '../../shared/components/safe-and-easy-donation/safe-and-easy-donation.component';
import { LatestBlogsComponent } from './latest-blogs/latest-blogs.component';
import { ButtonLinkComponent } from '../../shared/components/button-link/button-link.component';
import { BecomeVolunteerComponent } from '../../shared/components/become-volunteer/become-volunteer.component';
import { DonationCardComponent } from '../../shared/components/donation-card/donation-card.component';
import { IDonationForm } from '../../shared/interfaces/donation/donation-form.interface';
import { IconCloseComponent } from '../../shared/icons/close/icon-close.component';
import { DonationFormService } from '../../core/services/donation/donation-form.service';
import { IApiResponse } from '../../shared/interfaces/api-response-interface';
import { IconVenmoComponent } from '../../shared/icons/payment-gateways/venmo/icon-venmo.component';
import { IconCashAppComponent } from '../../shared/icons/payment-gateways/cash-app/icon-cash-app.component';
import { IconPhoneComponent } from '../../shared/icons/phone/icon-phone.component';
import { IconUserComponent } from '../../shared/icons/user/icon-user.component';
import { IconVideoPlayComponent } from '../../shared/icons/video-play/icon-video-play.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import { IconZelleComponent } from "../../shared/icons/payment-gateways/zelle/icon-zelle.component";
import { IconEnvelopeComponent } from "../../shared/icons/envelope/icon-envelope.component";
import { IconHeaderComponent } from '../../shared/icons/number-header/icon-header.component';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styles: ``,
  animations: [
    trigger('overlayAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 0.75 })),
      ]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
  imports: [
    MainSliderComponent,
    ProjectCategoriesSliderComponent,
    ProjectsSliderSectionComponent,
    PartnersSliderComponent,
    SafeAndEasyDonationComponent,
    LatestBlogsComponent,
    ButtonLinkComponent,
    BecomeVolunteerComponent,
    DonationCardComponent,
    IconCloseComponent,
    IconVenmoComponent,
    IconCashAppComponent,
    IconPhoneComponent,
    IconUserComponent,
    IconVideoPlayComponent,
    CommonModule,
    IconZelleComponent,
    IconEnvelopeComponent,
    IconHeaderComponent
],
})
export class HomeComponent {
  videoModalOpened: Boolean = false;
  donationForm: IDonationForm;

  donationFormService: DonationFormService = inject(DonationFormService);
  private _document = inject(DOCUMENT);
  targetCount = 6078834;
  displayCount = 1;
  duration = 3000;

  ngOnInit(): void {
    this.onGetHomeDonationForm();
    this.startCountAnimation();
  }
  onGetHomeDonationForm(): void {
    this.donationFormService.getHomeDonationForm().subscribe({
      next: (res: IApiResponse<IDonationForm>) =>
        (this.donationForm = res.data),
    });
  }

  scrollToSection(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  toggleVideoModal() {
    this.videoModalOpened = !this.videoModalOpened;
    this._document.body.style.overflow = this.videoModalOpened ? 'hidden' : 'auto';
  }
  startCountAnimation(): void {
    const increment = Math.ceil(this.targetCount / (this.duration / 16.67));
    const interval = setInterval(() => {
      this.displayCount += increment;
      if (this.displayCount >= this.targetCount) {
        this.displayCount = this.targetCount;
        clearInterval(interval);
      }
    }, 16.67);
  }
}
