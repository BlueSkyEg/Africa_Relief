import { Component, inject } from '@angular/core';
import {MainSliderComponent} from "./main-slider/main-slider.component";
import {ProjectCategoriesSliderComponent} from "../../shared/components/projects/project-categories-slider/project-categories-slider.component";
import {ProjectsSliderSectionComponent} from "./projects-slider-section/projects-slider-section.component";
import {PartnersSliderComponent} from "./partners-slider/partners-slider.component";
import {SafeAndEasyDonationComponent} from "../../shared/components/safe-and-easy-donation/safe-and-easy-donation.component";
import {LatestBlogsComponent} from "./latest-blogs/latest-blogs.component";
import { ButtonLinkComponent } from "../../shared/components/button-link/button-link.component";
import { BecomeVolunteerComponent } from "../../shared/components/become-volunteer/become-volunteer.component";
import { DonationCardComponent } from "../../shared/components/donation-card/donation-card.component";
import { IconZelleComponent } from "../../shared/icons/zelle/icon-zelle.component";
import { IDonationForm } from '../../shared/interfaces/donation/donation-form.interface';
import { IconEnvelopeComponent } from "../../shared/icons/envelope/icon-envelope.component";
import { IconPinComponent } from "../../shared/icons/pin/icon-pin.component";
import { animate, style, transition, trigger } from '@angular/animations';
import { IconCloseComponent } from "../../shared/icons/close/icon-close.component";
import { DonationFormService } from '../../core/services/donation/donation-form.service';
import { IApiResponse } from '../../shared/interfaces/api-response-interface';

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
            transition(':leave', [
                animate('100ms', style({ opacity: 0 }))
            ])
        ])
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
        IconZelleComponent,
        IconEnvelopeComponent,
        IconPinComponent,
        IconCloseComponent
    ]
})
export class HomeComponent {

  videoModalOpened: Boolean = false;
  donationForm: IDonationForm;

  donationFormService: DonationFormService = inject(DonationFormService);

  ngOnInit(): void {
    this.onGetHomeDonationForm();
  }

  onGetHomeDonationForm(): void {
    this.donationFormService.getHomeDonationForm().subscribe({
      next: (res: IApiResponse<IDonationForm>) => this.donationForm = res.data
    })
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  toggleVideoModal() {
    this.videoModalOpened = !this.videoModalOpened;
    this.videoModalOpened ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
  }
}
