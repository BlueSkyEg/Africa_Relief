import { Component, Input, inject } from '@angular/core';
import {IconDonorAvatarsComponent} from "../../icons/donor-avatars/icon-donor-avatars.component";
import {ButtonComponent} from "../form/button/button.component";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {DonationModalService} from "../../../core/services/donation/donation-modal.service";
import { IDonationLevel } from '../../interfaces/donation-level-inteface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donation-card',
  standalone: true,
  imports: [
    CommonModule,
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
  @Input() donationLevels: IDonationLevel[];
  @Input() recurringPeriods: string[];
  @Input() fullyFundLevel: number|null = null;
  amount: number;
  makeRecurringDonation: boolean = false;
  recurringPeriod: 'day'|'week'|'month'|'quarter'|'year' = 'month';
  donationModalService: DonationModalService = inject(DonationModalService);

  openModal() {
    this.donationModalService.modalOpened.next(true);
  }
}
