import { Component } from '@angular/core';
import {DonationCardComponent} from "../../../shared/components/donation-card/donation-card.component";
import {IconZelleComponent} from "../../../shared/icons/zelle/icon-zelle.component";
import { IDonationLevel } from '../../../shared/interfaces/donation/donation-level-inteface';
import { IDonationForm } from '../../../shared/interfaces/donation/donation-form.interface';

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
}
