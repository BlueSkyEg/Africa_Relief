import { Component } from '@angular/core';
import {DonationCardComponent} from "../../../shared/components/donation-card/donation-card.component";
import {IconZelleComponent} from "../../../shared/icons/zelle/icon-zelle.component";
import { IDonationLevel } from '../../../shared/interfaces/donation/donation-level-inteface';

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
  donationLevels: IDonationLevel[] = [
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
  ];
  recurringPeriods: string[] = ['day', 'week', 'month', 'quarter', 'year'];
  fullyFundLevel: number|null = null;
}
