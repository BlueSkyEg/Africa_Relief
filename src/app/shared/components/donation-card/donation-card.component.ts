import {Component, Input, inject } from '@angular/core';
import {IconDonorAvatarsComponent} from "../../icons/donor-avatars/icon-donor-avatars.component";
import {ButtonComponent} from "../form/button/button.component";
import {MatSelect,MatOption} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { IDonationForm } from '../../interfaces/donation/donation-form.interface';
import { Router } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';
@Component({
  selector: 'app-donation-card',
  standalone: true,
  imports: [
  CommonModule,
    IconDonorAvatarsComponent,
    ButtonComponent,
    MatSelect,
    MatOption,
    FormsModule,
    MatCheckbox
  ],
  templateUrl: './donation-card.component.html',
  styles: ``,
})
export class DonationCardComponent {
  @Input() donationForm: IDonationForm;
  amount: number;
  makeRecurringDonation: boolean = false;
  recurringPeriod: 'day' | 'week' | 'month' | 'year' = 'month';

  router: Router = inject(Router);
  onMakeDonation() {
    // check if donation amount is a positive value and greater than 1$
    if (isNaN(this.amount) || this.amount < 1) return;
    //data layer
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'donationEventBeforeTheUserFillTheForm',
      donationAmount: this.amount,
      donationFormId: this.donationForm.id,
      donationFormTitle: this.donationForm.title,
    });
    this.router.navigate(['/donation'], {
      queryParams: {
        form: this.donationForm.id,
        title: this.donationForm.title,
        amount: this.amount,
        recurringPeriod: this.makeRecurringDonation
          ? this.recurringPeriod
          : null,
      },
    });
  }
}
