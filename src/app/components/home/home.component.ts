import { Component } from '@angular/core';
import {MainSliderComponent} from "./main-slider/main-slider.component";
import {DonationCardSectionComponent} from "./donation-card-section/donation-card-section.component";
import {ProjectCategoriesSliderComponent} from "../../shared/components/projects/project-categories-slider/project-categories-slider.component";
import {ProjectsSliderSectionComponent} from "./projects-slider-section/projects-slider-section.component";
import {PartnersSliderComponent} from "./partners-slider/partners-slider.component";
import {DonateByZelleComponent} from "./donate-by-zelle/donate-by-zelle.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MainSliderComponent,
    DonationCardSectionComponent,
    ProjectCategoriesSliderComponent,
    ProjectsSliderSectionComponent,
    PartnersSliderComponent,
    DonateByZelleComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
