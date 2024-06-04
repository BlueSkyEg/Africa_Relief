import { Component, Input, inject } from '@angular/core';
import {IconDonorAvatarsComponent} from "../../icons/donor-avatars/icon-donor-avatars.component";
import {ButtonComponent} from "../form/button/button.component";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import { CommonModule } from '@angular/common';
import { IDonationForm } from '../../interfaces/donation/donation-form.interface';
import { Router } from '@angular/router';

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
  styles: ``
})
export class DonationCardComponent {
  @Input() donationForm: IDonationForm;
  amount: number;
  makeRecurringDonation: boolean = false;
  recurringPeriod: 'day'|'week'|'month'|'year' = 'month';

  router: Router = inject(Router);

  onMakeDonation() {
    // check if donation amount is a positive value and greater than 1$
    if(isNaN(this.amount) || this.amount < 1) return;

    this.router.navigate(['/donation'], {
      queryParams: {
        'form': this.donationForm.id,
        'title': this.donationForm.title,
        'amount': this.amount,
        'recurringPeriod': this.makeRecurringDonation ? this.recurringPeriod : null
      }
    });
  }
}
