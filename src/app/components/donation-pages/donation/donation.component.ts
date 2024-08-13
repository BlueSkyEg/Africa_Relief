import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { FieldComponent } from "../../../shared/components/form/field/field.component";
import { LabelComponent } from "../../../shared/components/form/label/label.component";
import { FormElementDirective } from '../../../shared/directives/form-element.directive';
import { ErrorComponent } from "../../../shared/components/form/error/error.component";
import { Observable, map } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../core/services/payment/payment.service';
import { PaymentMethodResult } from '@stripe/stripe-js';
import { StripeService } from 'ngx-stripe';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from "../../../shared/components/form/button/button.component";
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Country, State, City, ICity, IState, ICountry }  from 'country-state-city';
import { IUser } from '../../../shared/interfaces/auth/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { StringValidator } from '../../../core/validators/string.validator';
import { EmailValidator } from '../../../core/validators/email.validator';
import { PhoneValidator } from '../../../core/validators/phone.validator';
import { ExpressCheckoutElementComponent } from "./express-checkout-element/express-checkout-element.component";
import { CardElementsComponent } from './card-elements/card-elements.component';
import { IBillingDetails } from '../../../shared/interfaces/payment/billing-details.interface';
import { IStripeIntent } from '../../../shared/interfaces/payment/stripe-intent.interface';

@Component({
  selector: 'app-donation',
  standalone: true,
  templateUrl: './donation.component.html',
  styles: ``,
  imports: [CommonModule, ReactiveFormsModule, MatAutocompleteModule, MatStepperModule, FieldComponent, LabelComponent, ErrorComponent, ButtonComponent, FormElementDirective, ExpressCheckoutElementComponent, CardElementsComponent]
})
export class DonationComponent {
  @ViewChild(CardElementsComponent) stripeCardElements : CardElementsComponent;

  donationFormId: string;
  donationFormTitle: string;
  donationAmount: number;
  recurringPeriod: string;
  stepperOrientation: Observable<StepperOrientation>;

  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  fb: FormBuilder = inject(FormBuilder);
  paymentService: PaymentService = inject(PaymentService);
  authService: AuthService = inject(AuthService);
  _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  _stripeService: StripeService = inject(StripeService);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  _gtmService: GoogleTagManagerService = inject(GoogleTagManagerService);


  constructor() {
    this.stepperOrientation = this._breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

    this.activeRoute.queryParamMap.subscribe({
      next: p => {
        this.donationFormId = p['params'].form;
        this.donationFormTitle = p['params'].title;
        this.donationAmount = p['params'].amount;
        this.recurringPeriod = p['params'].recurringPeriod;
      }
    })
  }

  personalDetailsForm = this.fb.group({
    name: ['', [Validators.required, StringValidator()]],
    email: ['', [Validators.required, EmailValidator()]],
    phone: ['', [Validators.required, PhoneValidator()]],
  });

  billingDetailsForm = this.fb.group({
    country: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}$/)]],
    addressLine1: ['', [Validators.required, StringValidator(2, 100, true)]],
    addressLine2: ['', [StringValidator(0, 100, true)]],
    city: ['', [Validators.required, StringValidator(2, 20, true)]],
    state: ['', [Validators.required, StringValidator(2, 20, true)]],
    postalCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    anonymousDonation: ['']
  });

  checkoutForm = this.fb.group({
    billingComment: ['', [StringValidator(0, 500, true)]]
  })

  ngOnInit() {
    this.authService.authedUserSubject.asObservable().subscribe({
      next: (user: IUser) => {
        this.personalDetailsForm.patchValue({
          name: user?.name,
          email: user?.email,
          phone: user?.phone
        })
      }
    });
  }

  checkoutFormDisabled: boolean = false;

  onMakeDonation(){
    this.checkoutFormDisabled = true;

    // exit if donation form or card are invalid
    if(this.checkoutForm.invalid || !this.stripeCardElements.isCardValid()) return;

    // Set donationStarted key in session storage
    // to be indicator for donation confirmation and failed pages
    // if the user visit them directely or redirected during the donation
    sessionStorage.setItem('donationStarted', JSON.stringify(true));

    // make donation proccess
    const { name, email, phone } = this.personalDetailsForm.getRawValue();
    const { city, country, addressLine1, addressLine2, postalCode, state } = this.billingDetailsForm.getRawValue();
    const billingDetails: IBillingDetails = {name, email, phone, city, country, addressLine1, addressLine2, postalCode, state};

    this.stripeCardElements.createPaymentMethod(billingDetails).subscribe({
      next: (res: PaymentMethodResult) => {
        if(res.error) {
          this._snackBar.open(res.error.message, '✖', {panelClass: 'failure-snackbar'});
          this.checkoutFormDisabled = false;
          this.pushTagFailedDonationEvent(res.error.message);
          return;
        }
        this.createPayment(res.paymentMethod.id).subscribe({
          next: (res: IApiResponse<IStripeIntent>) => {
            if(res.data.status === 'succeeded') {
              this.pushTagConfirmDonationEvent();
              this.router.navigateByUrl('/donation-confirmation');
            } else if(res.data.status === 'requires_action') {
              this.handleCardAction(res.data.client_secret);
            } else {
              this._snackBar.open('Your card was declined.', '✖', {panelClass: 'failure-snackbar'});
              this.pushTagFailedDonationEvent('Your card was declined.');
              this.checkoutFormDisabled = false;
            }
          }
        })
      }
    })
  }

  // Handle Payment
  createPayment(stripePaymentMethodId: string): Observable<IApiResponse<IStripeIntent>> {
    const { name, email } = this.personalDetailsForm.getRawValue();
    const { billingComment } = this.checkoutForm.getRawValue();

    return this.paymentService.createPayment(
      {
        name: name,
        email: email,
        amount: this.donationAmount,
        donationFormId: this.donationFormId,
        stripePaymentMethodId: stripePaymentMethodId,
        recurringPeriod: this.recurringPeriod,
        anonymousDonation: false,
        savePaymentMethod: this.recurringPeriod ? true : false,
        billingComment: billingComment
      }
    )
  }

  // Handle 3D Secure Authentication (OTP)
  handleCardAction(clientSecret: string): void {
    this._stripeService.confirmCardPayment(clientSecret).subscribe({
      next: res => {
        if(res.error) {
          this._snackBar.open(res.error.message, '✖', {panelClass: 'failure-snackbar'});
          this.checkoutFormDisabled = false;
          this.pushTagFailedDonationEvent(res.error.message);
        } else {
          this.pushTagConfirmDonationEvent();
          this.router.navigateByUrl('/donation-confirmation');
        }
      }
    })
  }

  // Push Google Tag Manager Donation Confirmation Event
  pushTagConfirmDonationEvent(): void {
    const gtmTag = {
      event: 'donationConfirmation',
      donationAmount: this.donationAmount,
      donationFormTitle: this.donationFormTitle,
      recurringPeriod: this.recurringPeriod
    };
    this._gtmService.pushTag(gtmTag);
  }

  // Push Google Tag Manager Donation Failed Event
  pushTagFailedDonationEvent(donationFaildReason: string): void {
    const gtmTag = {
      event: 'donationFaild',
      faildReason: donationFaildReason
    };
    this._gtmService.pushTag(gtmTag);
  }

  // Filter Countries & States & Cities based on user selection
  countries: ICountry[] = Country.getAllCountries();
  states: IState[] = [];
  cities: ICity[] = [];
  filteredCountries: ICountry[] = this.countries;
  filteredStates: IState[];
  filteredCities: ICity[];

  filterCountries(country: string): void {
    this.filteredCountries = this.countries.filter(c => c.name.toLowerCase().includes(country.toLowerCase()));
  }

  filterStates(state: string): void {
    this.filteredStates = this.states.filter(s => s.name.toLowerCase().includes(state.toLowerCase()));
  }

  filterCities(city: string): void {
    this.filteredCities = this.cities.filter(c => c.name.toLowerCase().includes(city.toLowerCase()));
  }

  getOptionText(option: ICountry|IState) {
    return option ? option.name : null;
  }

  onChangeCountry(country: ICountry) {
    this.billingDetailsForm.controls.country.setValue(country.isoCode);
    this.cities = [];
    this.billingDetailsForm.controls.state.reset();
    this.billingDetailsForm.controls.city.reset();
    this.states = State.getStatesOfCountry(country.isoCode);
  }

  onChangeState(state: IState) {
    this.billingDetailsForm.controls.state.setValue(state.isoCode);
    this.billingDetailsForm.controls.city.reset();
    this.cities = City.getCitiesOfState(this.billingDetailsForm.controls.country.value, state.isoCode);
  }
}