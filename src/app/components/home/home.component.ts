import { Component } from '@angular/core';
import {MainSliderComponent} from "./main-slider/main-slider.component";
import {DonationCardSectionComponent} from "./donation-card-section/donation-card-section.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MainSliderComponent,
    DonationCardSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
