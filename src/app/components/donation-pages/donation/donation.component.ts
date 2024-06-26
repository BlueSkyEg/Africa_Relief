import { Component, ViewChild, computed, inject, signal } from '@angular/core';
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
import { PaymentMethodResult, SetupIntent, StripeCardCvcElementChangeEvent, StripeCardElementOptions, StripeCardExpiryElementChangeEvent, StripeCardNumberElementChangeEvent, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardCvcComponent, StripeCardExpiryComponent, StripeCardGroupDirective, StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { IPaymentRequiresAction } from '../../../shared/interfaces/payment-requires-action.interface';
import { ButtonComponent } from "../../../shared/components/form/button/button.component";
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Country, State, City, ICity, IState, ICountry }  from 'country-state-city';
import { IUser } from '../../../shared/interfaces/auth/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { IIntentClientSecret } from '../../../shared/interfaces/payment/intent-client-secret.interface';
import { StringValidator } from '../../../core/validators/string.validator';
import { EmailValidator } from '../../../core/validators/email.validator';
import { PhoneValidator } from '../../../core/validators/phone.validator';

@Component({
  selector: 'app-donation',
  standalone: true,
  templateUrl: './donation.component.html',
  styles: ``,
  imports: [CommonModule, StripeCardNumberComponent, StripeCardCvcComponent, StripeCardExpiryComponent, StripeCardGroupDirective, FormElementDirective, ReactiveFormsModule, MatAutocompleteModule, MatStepperModule, FieldComponent, LabelComponent, ErrorComponent, ButtonComponent]
})
export class DonationComponent {

  donationFormId: string;
  donationFormTitle: string;
  donationAmount: string;
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
    zipCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    anonymousDonation: ['']
  });

  checkoutForm = this.fb.group({
    billingComment: ['', [StringValidator(0, 500, true)]]
  })

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

  // Handel Stripe Payment Card
  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

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

    this.paymentService.setupPaymentIntent().subscribe({
      next: (res: IApiResponse<IIntentClientSecret>) => this.elementsOptions.clientSecret = res.data.client_secret
    });
  }

  checkoutFormDisabled: boolean = false;

  onMakeDonation(){
    this.checkoutFormDisabled = true;

    // exit if donation form or card are invalid
    if(this.checkoutForm.invalid || !this.isCardValid()) return;

    // Set donationStarted key in session storage
    // to be indicator for donation confirmation and failed pages
    // if the user visit them directely or redirected during the donation
    sessionStorage.setItem('donationStarted', JSON.stringify(true));

    // make donation proccess
    this.createPaymentMethod().subscribe({
      next: (res: PaymentMethodResult) => {
        if(res.error) {
          this._snackBar.open(res.error.message, '✖', {panelClass: 'failure-snackbar'});
          this.checkoutFormDisabled = false;
          this.pushTagFailedDonationEvent(res.error.message);
          return;
        }
        this.createPayment(res.paymentMethod.id).subscribe({
          next: (res: IApiResponse<IPaymentRequiresAction>) => {
            if(res.success) {
              this.pushTagConfirmDonationEvent();
              this.router.navigateByUrl('/donation-confirmation');
            } else if(res.data?.requiresAction) {
              this.handleCardAction(res.data.clientSecret);
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

  // Create Payment Method on Stripe
  createPaymentMethod(): Observable<PaymentMethodResult> {
    const { name, email, phone } = this.personalDetailsForm.getRawValue();
    const { city, country, addressLine1, addressLine2, zipCode, state } = this.billingDetailsForm.getRawValue();

    return this._stripeService.createPaymentMethod({
      type: "card",
      card: this.card.element,
      billing_details: {
        name: name,
        email: email,
        phone: phone,
        address: {
          city: city,
          country: country,
          line1: addressLine1,
          line2: addressLine2,
          postal_code: zipCode,
          state: state,
        }
      }
    });
  }

  // Handle Payment
  createPayment(paymentMethodId: string): Observable<IApiResponse<IPaymentRequiresAction>> {
    const { name, email } = this.personalDetailsForm.getRawValue();
    const { billingComment } = this.checkoutForm.getRawValue();

    return this.paymentService.createPayment(
      {
        paymentMethodId: paymentMethodId,
        amount: this.donationAmount,
        recurringPeriod: this.recurringPeriod,
        donationFormId: this.donationFormId,
        donationFormTitle: this.donationFormTitle,
        name: name,
        email: email,
        billingComment: billingComment,
        anonymousDonation: false,
        savePaymentMethod: true
      }
    )
  }

  // Handle 3D Secure Authentication (Two Factor Authentication)
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

  // Handel Payment Card Errors
  cardNumberError = signal<string>(' ');
  cardExpiryError = signal<string>(' ');
  cardCvvError = signal<string>(' ');
  isCardValid = computed(() => !this.cardNumberError() && !this.cardExpiryError() && !this.cardCvvError());

  onCardNumberChange(e: StripeCardNumberElementChangeEvent) {
    this.cardNumberError.set(e.error ? e.error.message : null);
  }

  onCardExpiryChange(e: StripeCardExpiryElementChangeEvent) {
    this.cardExpiryError.set(e.error ? e.error.message : null);
  }

  onCardCvvChange(e: StripeCardCvcElementChangeEvent) {
    this.cardCvvError.set(e.error ? e.error.message : null);
  }
}
