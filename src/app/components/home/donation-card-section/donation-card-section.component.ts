import { Component } from '@angular/core';
import {DonationCardComponent} from "../../../shared/components/donation-card/donation-card.component";

@Component({
  selector: 'app-donation-card-section',
  standalone: true,
  imports: [
    DonationCardComponent
  ],
  templateUrl: './donation-card-section.component.html',
  styles: ''
})
export class DonationCardSectionComponent {

}
