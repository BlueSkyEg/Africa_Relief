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
        BecomeVolunteerComponent
    ]
})
export class HomeComponent {

}
