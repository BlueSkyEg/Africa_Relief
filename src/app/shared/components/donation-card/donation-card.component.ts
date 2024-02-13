import { Component } from '@angular/core';
import {IconDonorAvatarsComponent} from "../../icons/donor-avatars/icon-donor-avatars.component";
import {ButtonComponent} from "../form/button/button.component";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {DonationModalService} from "../../../core/services/donation/donation-modal.service";

@Component({
  selector: 'app-donation-card',
  standalone: true,
  imports: [
    IconDonorAvatarsComponent,
    ButtonComponent,
    MatSelectModule,
    FormsModule,
    MatCheckbox
  ],
  templateUrl: './donation-card.component.html',
  styleUrl: './donation-card.component.scss'
})
export class DonationCardComponent {

  constructor(private donationModalService: DonationModalService) {
  }

  amount: number;
  makeRecurringDonation: boolean = false;
  recurringPeriod: 'day'|'week'|'month'|'quarter'|'year' = 'month';

  openModal() {
    this.donationModalService.modalOpened.next(true);
  }
}
