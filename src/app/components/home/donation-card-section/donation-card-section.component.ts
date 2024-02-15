import { Component } from '@angular/core';
import {DonationCardComponent} from "../../../shared/components/donation-card/donation-card.component";
import {IconZelleComponent} from "../../../shared/icons/zelle/icon-zelle.component";

@Component({
  selector: 'app-donation-card-section',
  standalone: true,
  imports: [
    DonationCardComponent,
    IconZelleComponent
  ],
  templateUrl: './donation-card-section.component.html',
  styles: ''
})
export class DonationCardSectionComponent {

}
