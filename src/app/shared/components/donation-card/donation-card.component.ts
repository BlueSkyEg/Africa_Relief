import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { ButtonComponent } from '../form/button/button.component';
import { MatSelect, MatOption } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IDonationForm } from '../../interfaces/donation/donation-form.interface';
import { Router } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-donation-card',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatSelect,
    MatOption,
    FormsModule,
    MatCheckbox,
  ],
  templateUrl: './donation-card.component.html',
  styles: ``,
})
export class DonationCardComponent {
  @Input() donationForm: IDonationForm;
  @Input() donationFormTitle: string = '';
  amount: number;
  makeRecurringDonation: boolean = false;
  recurringPeriod: 'day' | 'week' | 'month' | 'year' = 'month';
  selectedLevelIdentifier: string;
  private router: Router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  //to change the value of amount and custom amount when form changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['donationForm'] && !changes['donationForm'].firstChange) {
      console.log(changes['donationForm'].currentValue);
      this.amount = null;
      this.selectedLevelIdentifier = null;
      this.makeRecurringDonation = false;
      this.recurringPeriod = 'month';
    }
  }
  onMakeDonation() {
    // check if donation amount is a positive value and greater than 1$
    if (isNaN(this.amount) || this.amount < 1) return;

    // Check if running in the browser before accessing window
    if (isPlatformBrowser(this.platformId)) {
      // Data layer
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'donationEventBeforeTheUserFillTheForm',
        donationAmount: this.amount,
        donationFormId: this.donationForm.id,
        // donationFormTitle: this.donationForm.title,
        donationFormTitle: this.donationFormTitle
      });

    }
    this.router.navigate(['/donation'], {
      queryParams: {
        form: this.donationForm.id,
        //title: this.donationForm.title,
        title: this.donationFormTitle,
        amount: this.amount,
        recurringPeriod: this.makeRecurringDonation
          ? this.recurringPeriod
          : null,
      },
    });
  }
  validateKeyPress(event: KeyboardEvent): void {
    // Allow only digits and prevent the negative symbol
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  validateInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Replace any non-digit character and ensure positive values
    input.value = input.value.replace(/[^0-9]/g, '');
  }
  getLevelIdentifier(level: any): string {
    return level.name ? `${level.amount}_${level.name}` : `${level.amount}`;
  }
  onLevelSelect(level: any) {
    this.amount = level.amount;
    this.selectedLevelIdentifier = this.getLevelIdentifier(level);
  }

}