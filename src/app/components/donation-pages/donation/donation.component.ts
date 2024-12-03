import {
  Component,
  Inject,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatStepperModule,
  StepperOrientation,
} from '@angular/material/stepper';
import { FieldComponent } from '../../../shared/components/form/field/field.component';
import { LabelComponent } from '../../../shared/components/form/label/label.component';
import { FormElementDirective } from '../../../shared/directives/form-element.directive';
import { ErrorComponent } from '../../../shared/components/form/error/error.component';
import { Observable, map } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PaymentService } from '../../../core/services/payment/payment.service';
import { PaymentMethodResult } from '@stripe/stripe-js';
import { StripeService } from 'ngx-stripe';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../../../core/services/auth/auth.service';
import { IUser } from '../../../shared/interfaces/auth/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { StringValidator } from '../../../core/validators/string.validator';
import { EmailValidator } from '../../../core/validators/email.validator';
import { PhoneValidator } from '../../../core/validators/phone.validator';
import { ExpressCheckoutElementComponent } from './express-checkout-element/express-checkout-element.component';
import { CardElementsComponent } from './card-elements/card-elements.component';
import { IBillingDetails } from '../../../shared/interfaces/payment/billing-details.interface';
import { IStripeIntent } from '../../../shared/interfaces/payment/stripe-intent.interface';
import * as countryCodes from 'country-codes-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-donation',
  standalone: true,
  templateUrl: './donation.component.html',
  styles: ``,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatStepperModule,
    FieldComponent,
    LabelComponent,
    ErrorComponent,
    FormElementDirective,
    ExpressCheckoutElementComponent,
    CardElementsComponent,
    FormsModule,
    MatCheckboxModule
  ],
})
export class DonationComponent {
  @ViewChild(CardElementsComponent) stripeCardElements: CardElementsComponent;

  name: string;
  email: string;
  phone: string;
  contributionType: string;
  contributionName: string;
  city: string;
  country: string;
  donationFormId: string;
  donationFormTitle: string;
  donationAmount: number;
  recurringPeriod: string;
  stepperOrientation: Observable<StepperOrientation>;
  coverFees: boolean = false;
  feePercentage: number = 2.9;
  checkoutFormDisabled: boolean = false;
  isChecked: boolean = false;
  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  fb: FormBuilder = inject(FormBuilder);
  paymentService: PaymentService = inject(PaymentService);
  authService: AuthService = inject(AuthService);
  _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  _stripeService: StripeService = inject(StripeService);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  _gtmService: GoogleTagManagerService = inject(GoogleTagManagerService);
  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.stepperOrientation = this._breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.activeRoute.queryParamMap.subscribe({
      next: (p) => {
        this.donationFormId = p['params'].form;
        this.donationFormTitle = p['params'].title;
        this.donationAmount = p['params'].amount;
        this.recurringPeriod = p['params'].recurringPeriod;
      },
    });
  }

  personalDetailsForm = this.fb.group({
    name: ['', [Validators.required, StringValidator()]],
    email: ['', [Validators.required, EmailValidator()]],
    phone: ['', [Validators.required, PhoneValidator()]],
    contributionType: ['', [Validators.required]],
    contributionName: ['', [Validators.required]],

  });

  billingDetailsForm = this.fb.group({
    country: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}$/)]],
    addressLine1: ['', [Validators.required, StringValidator(2, 100, true)]],
    addressLine2: ['', [StringValidator(0, 100, true)]],
    city: ['', [Validators.required, StringValidator(2, 20, false)]],
    state: ['', [Validators.required, StringValidator(2, 20, true)]],
    postalCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    anonymousDonation: [''],
  });

  checkoutForm = this.fb.group({
    billingComment: ['', [StringValidator(0, 500, true)]],
    coverFees: [false],
  });

  ngOnInit() {
    this.updateContributionValidators();
    if (this.isBrowser) {
      this.authService.authedUserSubject.asObservable().subscribe({
        next: (user: IUser) => {
          this.personalDetailsForm.patchValue({
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            contributionName: user?.contributionName,
            contributionType: user?.contributionType
          });
        },
      });
    }
    if (this.filtereddedications.length > 0) {
      this.personalDetailsForm.controls.contributionType.setValue(this.filtereddedications[0]);
    }
  }

  onMakeDonation() {
    this.checkoutFormDisabled = true;

    // exit if donation form or card are invalid
    if (this.checkoutForm.invalid || !this.stripeCardElements.isCardValid()) return;

    // Calculate donation amount, including fees if applicable
    this.coverFees = this.checkoutForm.get('coverFees')?.value || false;

    // Set donationStarted key in session storage
    if (this.isBrowser) {
      sessionStorage.setItem('donationStarted', JSON.stringify(true));
    }

    // Get personal details and billing details
    const { name, email, phone, contributionType, contributionName } = this.personalDetailsForm.getRawValue();
    const { city, country, addressLine1, addressLine2, postalCode, state } = this.billingDetailsForm.getRawValue();

    // Prepare billing details
    const billingDetails: IBillingDetails = {
      name,
      email,
      phone,
      city,
      country,
      addressLine1,
      addressLine2,
      postalCode,
      state,

    };

    // Proceed with donation
    this.name = name;
    this.email = email;
    this.contributionName = contributionName;
    this.contributionType = contributionType;
    this.phone = phone;
    this.city = city;
    this.country = country;

    const finalAmount = this.donationAmount;
    this.coverFees = this.checkoutForm.get('coverFees')?.value || false;

    this.stripeCardElements.createPaymentMethod(billingDetails).subscribe({
      next: (res: PaymentMethodResult) => {
        if (res.error) {
          this._snackBar.open(res.error.message, '✖', { panelClass: 'failure-snackbar' });
          this.checkoutFormDisabled = false;
          this.pushTagFailedDonationEvent(res.error.message);
          return;
        }

        this.createPayment(res.paymentMethod.id, finalAmount.toString()).subscribe({
          next: (res: IApiResponse<IStripeIntent>) => {

            if (res?.data?.status === 'succeeded') {
              this.pushTagConfirmDonationEvent();
              this.router.navigateByUrl('/donation-confirmation');
            } else if (res?.data?.status === 'requires_action') {
              this.handleCardAction(res.data.client_secret);
            } else {
              this._snackBar.open('Your card was declined.', '✖', { panelClass: 'failure-snackbar' });
              this.pushTagFailedDonationEvent('Your card was declined.');
              this.checkoutFormDisabled = false;
            }
          },
        });
      },
    });
  }

  // Handle Payment
  createPayment(
    stripePaymentMethodId: string,
    finalAmount: any,
  ): Observable<IApiResponse<IStripeIntent>> {
    const { name, email, contributionName, contributionType } = this.personalDetailsForm.getRawValue();
    const { billingComment } = this.checkoutForm.getRawValue();

    const paymentData = {
      name: name,
      email: email,
      contributionName: contributionName,
      contributionType: contributionType,
      amount: finalAmount,
      donationFormId: this.donationFormId,
      stripePaymentMethodId: stripePaymentMethodId,
      recurringPeriod: this.recurringPeriod,
      anonymousDonation: false,
      savePaymentMethod: this.recurringPeriod ? true : false,
      billingComment: billingComment,
      coverFees: this.coverFees,
    };
    console.log('Payment Data:', paymentData);
    return this.paymentService.createPayment(paymentData);
  }
  // Handle 3D Secure Authentication (OTP)
  handleCardAction(clientSecret: string): void {
    this._stripeService.confirmCardPayment(clientSecret).subscribe({
      next: (res) => {
        console.log(res);
        if (res.error) {
          this._snackBar.open(res.error.message, '✖', {
            panelClass: 'failure-snackbar',
          });

          this.checkoutFormDisabled = false;
          this.pushTagFailedDonationEvent(res.error.message);
        } else {
          this.pushTagConfirmDonationEvent();
          this.router.navigateByUrl('/donation-confirmation');
        }
      },
    });
  }

  // Push Google Tag Manager Donation Confirmation Event
  pushTagConfirmDonationEvent(): void {
    const gtmTag = {
      event: 'donationConfirmation',
      donationAmount: this.donationAmount,
      donationFormTitle: this.donationFormTitle,
      userName: this.name,
      userEmail: this.email,
      userPhone: this.phone,
      billingDetails: {
        city: this.city,
        country: this.country,
      },
      recurringPeriod: this.recurringPeriod,
    };
    this._gtmService.pushTag(gtmTag);
  }

  // Push Google Tag Manager Donation Failed Event
  pushTagFailedDonationEvent(donationFaildReason: string): void {
    const gtmTag = {
      event: 'donationFaild',
      faildReason: donationFaildReason,
    };
    this._gtmService.pushTag(gtmTag);
  }

  // Filter Countries by Name
  countries: countryCodes.CountryData[] = countryCodes.all();
  filteredCountries: countryCodes.CountryData[] = this.countries;

  filterCountries(searchTerm: string): void {
    this.filteredCountries = Object.entries(this.countries)
      .map((e) => e[1])
      .filter((el) =>
        el.countryNameEn.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }
  //filter dedicationTypes
  dedicationTypes = ['In Memory Of', 'In Honor Of'];
  filtereddedications = this.dedicationTypes;

  filterDedication(searchTerm: string): void {
    this.filtereddedications = this.dedicationTypes.filter((dedication) =>
      dedication.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onChangeCountry(country: countryCodes.CountryData) {
    this.billingDetailsForm.controls.country.setValue(country.countryCode);
  }
  onChangeDedication(dedication: string): void {
    this.personalDetailsForm.controls.contributionType.setValue(dedication);
  }
  getOptionText(option: countryCodes.CountryData) {
    return option ? option.countryNameEn : null;
  }
  getOptionTextDetection(option: string): string {
    return option ? option : null;
  }
  //DataLayer
  onFillPersonalDetails() {
    if (isPlatformBrowser(this.platformId)) {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'UserFilledPersonalDetailsForm(firstStage)',
      });
    }
  }
  onFillBillingAddress() {
    if (isPlatformBrowser(this.platformId)) {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'UserFilledBillingAddressForm(SecondStage)',
      });
    }
  }
  onCheckboxChange() {
    this.updateContributionValidators();
  }
  updateContributionValidators() {
    if (this.isChecked) {
      // Make fields required
      this.personalDetailsForm.get('contributionType')?.setValidators([Validators.required]);
      this.personalDetailsForm.get('contributionName')?.setValidators([Validators.required]);
    } else {
      // Make fields optional
      this.personalDetailsForm.get('contributionType')?.clearValidators();
      this.personalDetailsForm.get('contributionName')?.clearValidators();
      this.personalDetailsForm.get('contributionType')?.setValue(null);
      this.personalDetailsForm.get('contributionName')?.setValue(null);
    }
    // Update the form validation status after modifying validators
    this.personalDetailsForm.get('contributionType')?.updateValueAndValidity();
    this.personalDetailsForm.get('contributionName')?.updateValueAndValidity();
  }

}
