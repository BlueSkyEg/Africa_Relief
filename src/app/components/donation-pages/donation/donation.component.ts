import { Component, ViewChild, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatStepperModule, StepperOrientation} from '@angular/material/stepper';
import { FieldComponent } from "../../../shared/components/form/field/field.component";
import { LabelComponent } from "../../../shared/components/form/label/label.component";
import { FormElementDirective } from '../../../shared/directives/form-element.directive';
import { ErrorComponent } from "../../../shared/components/form/error/error.component";
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../core/services/payment/payment.service';
import { PaymentMethodResult, SetupIntent, StripeCardCvcElementChangeEvent, StripeCardElementOptions, StripeCardExpiryElementChangeEvent, StripeCardNumberElementChangeEvent, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardCvcComponent, StripeCardExpiryComponent, StripeCardGroupDirective, StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { Router } from '@angular/router';
import { IPaymentRequiresAction } from '../../../shared/interfaces/payment-requires-action.interface';
import { ButtonComponent } from "../../../shared/components/form/button/button.component";
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
    selector: 'app-donation',
    standalone: true,
    templateUrl: './donation.component.html',
    styles: ``,
    imports: [CommonModule, StripeCardNumberComponent, StripeCardCvcComponent, StripeCardExpiryComponent, StripeCardGroupDirective, FormElementDirective, ReactiveFormsModule, MatAutocompleteModule, CommonModule, MatStepperModule, FieldComponent, LabelComponent, ErrorComponent, ButtonComponent]
})
export class DonationComponent {

  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);
  paymentService: PaymentService = inject(PaymentService);
  stripeService: StripeService = inject(StripeService);
  stepperOrientation: Observable<StepperOrientation>;

  constructor(breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  personalDetailsForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]],
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

  options: {name: string, code: string}[] = [
    {name: "Denmark", code: "DK"},
    {name: "Djibouti", code: "DJ"},
    {name: "Dominica", code: "DM"},
    {name: "Ecuador", code: "EC"},
    {name: "Egypt", code: "EG"}
  ];
  filteredOptions: Observable<{name: string, code: string}[]>;

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
    this.filteredOptions = this.billingDetailsForm.get('country').valueChanges.pipe(
      startWith(''),
      map(value => {
        return this.options.filter(option => option.name.toLowerCase().includes(value.toLowerCase()))
      }),
    );

    this.paymentService.setupPaymentIntent().subscribe({
      next: (res: IApiResponse<SetupIntent>) => this.elementsOptions.clientSecret = res.data.client_secret
    })
  }

  isSubscription: boolean = true;

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
        if(this.isSubscription) {
          this.createSubscription(res.paymentMethod.id).subscribe({
            next: (res: IApiResponse<IPaymentRequiresAction>) => {
              if(res.success) {
                this.router.navigateByUrl('/donation-confirmation');
              } else if(res.data.requiresAction) {
                this.handleCardAction(res.data.clientSecret);
              }
            }
          })
        } else {
          this.createSingleCharge(res.paymentMethod.id).subscribe({
            next: (res: IApiResponse<IPaymentRequiresAction>) => {
              if(res.success) {
                this.router.navigateByUrl('/donation-confirmation');
              } else if(res.data.requiresAction) {
                this.handleCardAction(res.data.clientSecret);
              }
            }
          })
        }
      }
    })
  }

  createPaymentMethod(): Observable<PaymentMethodResult> {
    return this.stripeService.createPaymentMethod({
      type: "card",
      card: this.card.element,
      billing_details: {
        name: this.personalDetailsForm.get('name').value,
        email: this.personalDetailsForm.get('email').value,
        phone: this.personalDetailsForm.get('phone').value,
        address: {
          city: this.billingDetailsForm.get('city').value,
          country: this.billingDetailsForm.get('country').value,
          line1: this.billingDetailsForm.get('addressLine1').value,
          line2: this.billingDetailsForm.get('addressLine2').value,
          postal_code: this.billingDetailsForm.get('zipCode').value,
          state: this.billingDetailsForm.get('state').value,
        }
      }
    });
  }

  createSingleCharge(paymentMethodId: string): Observable<IApiResponse<IPaymentRequiresAction>> {
    return this.paymentService.createSingleCharge(
      {
        paymentMethodId: paymentMethodId,
        amount: '455',
        paymentDescription: 'Equal Opportunity For Children',
        donationFormId: '14577',
        name: this.personalDetailsForm.get('name').value,
        email: this.personalDetailsForm.get('email').value,
        billingComment: this.checkoutForm.get('billingComment').value,
        anonymousDonation: false,
        savePaymentMethod: false,
      }
    )
  }

  createSubscription(paymentMethodId: string): Observable<IApiResponse<IPaymentRequiresAction>> {
    return this.paymentService.createSubscription(
      {
        paymentMethodId: paymentMethodId,
        amount: '455',
        recurringPeriod: 'day',
        subscriptionName: 'Equal Opportunity For Children',
        donationFormId: '14577',
        name: this.personalDetailsForm.get('name').value,
        email: this.personalDetailsForm.get('email').value,
        billingComment: this.checkoutForm.get('billingComment').value,
        anonymousDonation: false,
        savePaymentMethod: true,
      }
    )
  }

  handleCardAction(clientSecret: string): void {
    if(this.isSubscription) {
      this.stripeService.confirmCardPayment(clientSecret).subscribe({
        next: res => {
          if(res.error) {
            this.router.navigateByUrl('/donation-failed')
          } else {
            this.router.navigateByUrl('/donation-confirmation')
          }
        }
      })
    } else {
      this.stripeService.handleCardAction(clientSecret).subscribe({
        next: res => {
          if(res.error) {
            this.router.navigateByUrl('/donation-failed')
          } else {
            this.paymentService.createSingleCharge({paymentIntentId: res.paymentIntent.id}).subscribe({
              next: res => {
                if(res.success) {
                  this.router.navigateByUrl('/donation-confirmation')
                } else {
                  this.router.navigateByUrl('/donation-failed')
                }
              }
            })
          }
        }
      })
    }
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
