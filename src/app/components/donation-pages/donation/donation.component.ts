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
import { PaymentMethodResult, SetupIntent, StripeCardCvcElementChangeEvent, StripeCardElementOptions, StripeCardExpiryElementChangeEvent, StripeCardNumberElementChangeEvent, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardCvcComponent, StripeCardExpiryComponent, StripeCardGroupDirective, StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { IPaymentRequiresAction } from '../../../shared/interfaces/payment-requires-action.interface';
import { ButtonComponent } from "../../../shared/components/form/button/button.component";
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Country, State, City, ICity, IState, ICountry }  from 'country-state-city';

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

  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  fb: FormBuilder = inject(FormBuilder);
  paymentService: PaymentService = inject(PaymentService);
  stripeService: StripeService = inject(StripeService);
  authService: AuthService = inject(AuthService);
  stepperOrientation: Observable<StepperOrientation>;

  constructor(breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
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
    name: [this.authService.authedUserSubject.value?.name, [Validators.required]],
    email: [this.authService.authedUserSubject.value?.email, [Validators.required, Validators.email]],
    phone: [this.authService.authedUserSubject.value?.phone, [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]],
  });

  billingDetailsForm = this.fb.group({
    country: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}$/)]],
    addressLine1: ['', [Validators.required]],
    addressLine2: ['', []],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    zipCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    anonymousDonation: ['']
  });

  checkoutForm = this.fb.group({
    billingComment: ['', [Validators.maxLength(500)]]
  })

  countries: ICountry[] = Country.getAllCountries();
  states: IState[] = [];
  cities: ICity[] = [];
  filteredCountries: ICountry[] = this.countries;
  filteredStates: IState[];
  filteredCities: ICity[];

  filterCountries(country: string): void {
    this.filteredCountries = this.countries.filter(c => c.name.toLowerCase().includes(country));
  }

  filterStates(state: string): void {
    this.filteredStates = this.states.filter(s => s.name.toLowerCase().includes(state));
  }

  filterCities(city: string): void {
    this.filteredCities = this.cities.filter(c => c.name.toLowerCase().includes(city));
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
    this.paymentService.setupPaymentIntent().subscribe({
      next: (res: IApiResponse<SetupIntent>) => this.elementsOptions.clientSecret = res.data.client_secret
    })
  }

  onMakeDonation(){
    // exit if donation form or card are invalid
    if(this.checkoutForm.invalid || !this.isCardNumberValid || !this.isCardCvvValid || !this.isCardExpiryValid) return;

    // Set donationStarted key in session storage
    // to be indicator for donation confirmation and failed pages
    // if the user visit them directely or redirected during the donation
    sessionStorage.setItem('donationStarted', JSON.stringify(true));

    // make donation proccess
    this.createPaymentMethod().subscribe({
      next: (res: PaymentMethodResult) => {
        this.createPayment(res.paymentMethod.id).subscribe({
          next: (res: IApiResponse<IPaymentRequiresAction>) => {
            if(res.success) {
              this.router.navigateByUrl('/donation-confirmation');
            } else if(res.data.requiresAction) {
              this.handleCardAction(res.data.clientSecret);
            } else {
              this.router.navigateByUrl('/donation-failed');
            }
          }
        })
      }
    })
  }

  createPaymentMethod(): Observable<PaymentMethodResult> {
    const { name, email, phone } = this.personalDetailsForm.getRawValue();
    const { city, country, addressLine1, addressLine2, zipCode, state } = this.billingDetailsForm.getRawValue();

    return this.stripeService.createPaymentMethod({
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

  handleCardAction(clientSecret: string): void {
    this.stripeService.confirmCardPayment(clientSecret).subscribe({
      next: res => {
        if(res.error) {
          this.router.navigateByUrl('/donation-failed')
        } else {
          this.router.navigateByUrl('/donation-confirmation')
        }
      }
    })
  }

  // Handel Payment Card Errors
  cardNumberError: string|null = null;
  cardExpiryError: string|null = null;
  cardCvvError: string|null = null;
  isCardNumberValid: boolean = false;
  isCardExpiryValid: boolean = false;
  isCardCvvValid: boolean = false;

  onCardNumberChange(e: StripeCardNumberElementChangeEvent) {
    e.error ? this.cardNumberError = e.error.message : this.cardNumberError = null;
    this.isCardNumberValid = e.complete;
  }

  onCardExpiryChange(e: StripeCardExpiryElementChangeEvent) {
    e.error ? this.cardExpiryError = e.error.message : this.cardExpiryError = null;
    this.isCardExpiryValid = e.complete;
  }

  onCardCvvChange(e: StripeCardCvcElementChangeEvent) {
    e.error ? this.cardCvvError = e.error.message : this.cardCvvError = null;
    this.isCardCvvValid = e.complete;
  }
}
