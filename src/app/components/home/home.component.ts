import { Component } from '@angular/core';
import {MainSliderComponent} from "./main-slider/main-slider.component";
import {DonationCardSectionComponent} from "./donation-card-section/donation-card-section.component";
import {ProjectCategoriesSliderComponent} from "../../shared/components/projects/project-categories-slider/project-categories-slider.component";
import {ProjectsSliderSectionComponent} from "./projects-slider-section/projects-slider-section.component";
import {PartnersSliderComponent} from "./partners-slider/partners-slider.component";
import {DonateByZelleComponent} from "./donate-by-zelle/donate-by-zelle.component";
import {SafeAndEasyDonationComponent} from "../../shared/components/safe-and-easy-donation/safe-and-easy-donation.component";
import {LatestBlogsComponent} from "./latest-blogs/latest-blogs.component";
import { ButtonLinkComponent } from "../../shared/components/button-link/button-link.component";
import { BecomeVolunteerComponent } from "../../shared/components/become-volunteer/become-volunteer.component";
import { DonationCardComponent } from "../../shared/components/donation-card/donation-card.component";
import { IconZelleComponent } from "../../shared/icons/zelle/icon-zelle.component";
import { IDonationForm } from '../../shared/interfaces/donation/donation-form.interface';
import { IconEnvelopeComponent } from "../../shared/icons/envelope/icon-envelope.component";
import { IconPinComponent } from "../../shared/icons/pin/icon-pin.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styles: ``,
    imports: [
        MainSliderComponent,
        DonationCardSectionComponent,
        ProjectCategoriesSliderComponent,
        ProjectsSliderSectionComponent,
        PartnersSliderComponent,
        DonateByZelleComponent,
        SafeAndEasyDonationComponent,
        LatestBlogsComponent,
        ButtonLinkComponent,
        BecomeVolunteerComponent,
        DonationCardComponent,
        IconZelleComponent,
        IconEnvelopeComponent,
        IconPinComponent
    ]
})
export class HomeComponent {

  donationForm: IDonationForm = {
    id: 14577,
    title: "Equal Opportunity For Children",
    levels: [
      {
        amount: 100,
        name: null
      },
      {
        amount: 250,
        name: null
      },
      {
        amount: 500,
        name: null
      }
    ],
    fullyFundLevel: null,
    recurringPeriods: [
      "day",
      "week",
      "month",
      "Quarter",
      "year"
    ]
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
}
}
