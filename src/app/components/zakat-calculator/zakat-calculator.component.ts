import {
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { IconDollarSignComponent } from '../../shared/icons/dollar-sign/icon-dollar-sign.component';
import { IconChevronDownComponent } from '../../shared/icons/arrows/chevron-down/icon-chevron-down.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/form/button/button.component';

@Component({
  selector: 'app-zakat-calculator',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    IconDollarSignComponent,
    IconChevronDownComponent,
    CommonModule,
    FormsModule,
    ButtonComponent
  ],
  templateUrl: './zakat-calculator.component.html',
  styles: `
  .accordion {
  .accordion-btn,
  .description {
    transition: 0.3s ease-in-out;
  }

  &.active {

    .description {
      max-height: 1200px;
      margin-top: 16px;
    }

    .accordion-btn {
      transform: rotate(180deg);
    }
  }
}`,
})
export class ZakatCalculatorComponent {
  @ViewChild('myDiv') myDiv!: ElementRef;
  @ViewChildren('accordion') accordionList: QueryList<ElementRef>;
  divHeight: number = 0;
  contentList = [
    { order: 1, type: 'heading', body: 'What is zakat in Islam?' },
    { order: 2, type: 'paragraph', body: 'Zakat is one of the Five Pillars of Islam and is a form of almsgiving or charity that is obligatory for all Muslims who meet certain criteria. It is considered a religious duty and is meant to purify wealth and help those in need.' },
    { order: 3, type: 'heading', body: 'Who is eligible for zakat?' },
    {
      order: 4,
      type: 'paragraph-list',
      body: [
        'In accordance with Islamic guidelines, understanding the Zakat eligibility criteria is crucial. According to the Holy Qur’an (9:60), there are eight categories of people who qualify to be recipients of Zakat:',
        'The poor',
        'The needy',
        'Zakat collectors',
        'Those whose heart to be reconciled',
        'Captives',
        'Those who are in debt (Debt not caused by extravagant lifestyle or non-responsible behavior)',
        'In the cause of Allah (SWT)',
        'Travelers',
        'Most scholars agree that the poor and needy are the most important categories of people to receive Zakat, aligning with Zakat eligibility criteria. It’s encouraged to allocate your entire Zakat to individuals in these groups, reflecting the principle of selecting the best charities for Zakat donations.While Zakat al - Mal is often given during Ramadan, choosing the best charities ensures your Zakat has a significant impact, regardless of timing.Zakat al - Fitr is due before Eid prayer, favoring direct support to the aforementioned eligible groups.',
      ]
    },
    { order: 5, type: 'heading', body: ' How to calculate zakat on gold?' },
    {
      order: 6, type: 'paragraph', body: '"Nisab" is the minimum wealth threshold for a Muslim to be eligible for Zakat, aligning with “Zakat payment guidelines.” This threshold is equivalent to 3 ounces of gold (or 85 grams of 24k gold). Our Zakat calculator, adhering to the “Zakat calculation formula,” is updated with the latest gold values (note: this can vary daily)."Hawl" marks one lunar year’s possession of Zakat assets, crucial for “calculating Zakat for savings” if they meet Nisab and have been held for Hawl, the Zakat due is 2.5%.Some Zakat types, like crops, don’t require Hawl, being due at harvest.For detailed guidance, consult a local imam or scholar.'
    },
    { order: 7, type: 'heading', body: 'How much is zakat Al-Fitr 2025?' },
    {
      order: 8, type: 'paragraph', body: 'Zakat is 15$ for each person in the family young or old.'
    },
    { order: 9, type: 'heading', body: ' Who is required to pay Zakat?' },
    {
      order: 10, type: 'paragraph', body: 'Every adult Muslim meeting nisab and hawl must pay Zakat, including on business income. Conditions may require others, like a wali for a minor, to pay. Exemptions and relief exist. Consult an imam for details.'
    },
    { order: 11, type: 'heading', body: ' What is the difference between Zakat and Sadaqah?' },
    {
      order: 12, type: 'paragraph', body: 'In the Qur’an, Zakat vs Sadaqah seem similar. Yet, sadaqah refers to voluntary charity, while Zakat is mandatory giving.'
    },
  ];
  summary = false;
  // Assets
  netCash: number = null;
  resaleValueOfShares: number = null;
  merchandiseProfits: number = null;
  goldSilver: number = null;
  otherIncome: number = null;
  get totalAssets(): number {
    return this.netCash + this.resaleValueOfShares + this.merchandiseProfits + this.goldSilver + this.otherIncome;
  }

  //Expenses
  deductDebts: number = null;
  deductExpenses: number = null;

  get zakatEligable() {
    return this.totalAssets - (this.deductDebts + this.deductExpenses);
  }
  get zakatEligableTotal() {
    if (this.zakatEligable > 6000) {
      return this.zakatEligable * 0.025;
    }
    return 0;
  }
  produceRentincome: number = null;
  expenses: number = null;
  get propertyZakatEligibleTotal() {
    return this.produceRentincome - this.expenses;
  }
  get TotalpropertyZakatAmount() {
    return this.propertyZakatEligibleTotal * 0.05
  }
  get total() {
    return this.zakatEligableTotal + this.TotalpropertyZakatAmount
  }

  ngAfterViewInit(): void {
    this.divHeight = this.myDiv.nativeElement.offsetHeight - 100;
  }

  toggolAccordion(targetAccordion: HTMLElement): void {
    this.accordionList.forEach((accordion) => {
      if (accordion.nativeElement !== targetAccordion) {
        accordion.nativeElement.classList.remove('active');
      }
    });
    targetAccordion.classList.toggle('active');
  }
  private platformId = inject(PLATFORM_ID);
  private router: Router = inject(Router);
  makeRecurringDonation: boolean = false;
  recurringPeriod: 'day' | 'week' | 'month' | 'year' = 'month';

  onMakeDonation() {
    const roundedTotal = Math.round(this.total);
    if (isNaN(roundedTotal) || roundedTotal < 1) return;
    if (isPlatformBrowser(this.platformId)) {
      // Data layer
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'donationEventBeforeTheUserFillTheForm',
        donationAmount: roundedTotal,
        donationFormId: 14707,
        donationFormTitle: 'Zakat-Al-Mal'
      });

    }
    this.router.navigate(['/donation'], {
      queryParams: {
        form: 14707,
        title: 'Zakat-Al-Mal',
        amount: roundedTotal,
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
  limitDigits(event: KeyboardEvent, maxDigits: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length >= maxDigits) {
      event.preventDefault();
    }
  }

}
