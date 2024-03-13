import { Component, ViewChild, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { FieldComponent } from "../../shared/components/form/field/field.component";
import { LabelComponent } from "../../shared/components/form/label/label.component";
import { FormElementDirective } from '../../shared/directives/form-element.directive';
import { ErrorComponent } from "../../shared/components/form/error/error.component";
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../core/services/payment/payment.service';
import { PaymentIntent, PaymentMethod, PaymentMethodResult, StripeCardCvcElementChangeEvent, StripeCardElementOptions, StripeCardExpiryElementChangeEvent, StripeCardNumberElementChangeEvent, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardCvcComponent, StripeCardExpiryComponent, StripeCardGroupDirective, StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { IApiResponse } from '../../shared/interfaces/api-response-interface';

@Component({
    selector: 'app-donation',
    standalone: true,
    templateUrl: './donation.component.html',
    styles: ``,
    imports: [StripeCardNumberComponent, StripeCardCvcComponent, StripeCardExpiryComponent, StripeCardGroupDirective, FormElementDirective, ReactiveFormsModule, MatAutocompleteModule, CommonModule, MatStepperModule, FieldComponent, LabelComponent, ErrorComponent],
  })
export class DonationComponent {

  fb: FormBuilder = inject(FormBuilder);
  paymentService: PaymentService = inject(PaymentService);
  stripeService: StripeService = inject(StripeService);

  donationForm = this.fb.group({
    formArray: this.fb.array([
      this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]],
      }),
      this.fb.group({
        country: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}$/)]],
        addressLine1: ['', [Validators.required]],
        addressLine2: ['', []],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        postalCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        anonymousDonation: ['']
      }),
      this.fb.group({
        billingComment: ['', [Validators.maxLength(500)]]
      })
    ]),
  })

  get personalDetails(): AbstractControl | null { return this.donationForm.get('formArray').get([0]) }
  get billingDetails(): AbstractControl | null { return this.donationForm.get('formArray').get([1]) }
  get checkout(): AbstractControl | null { return this.donationForm.get('formArray').get([2]) }

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
    this.filteredOptions = this.billingDetails.get('country').valueChanges.pipe(
      startWith(''),
      map(value => {
        return this.options.filter(option => option.name.toLowerCase().includes(value.toLowerCase()))
      }),
    );

    this.paymentService.setupPaymentIntent().subscribe({
      next: (res: IApiResponse<PaymentIntent>) => this.elementsOptions.clientSecret = res.data.client_secret
    })
  }

  onMakeDonation(){
    if(this.donationForm.invalid || !this.isCardNumberValid || !this.isCardCvvValid || !this.isCardExpiryValid) return;

    // Add Payment Method
    this.stripeService.createPaymentMethod({
      type: "card",
      card: this.card.element,
      billing_details: {
        name: this.personalDetails.get('name').value,
        email: this.personalDetails.get('email').value,
        phone: this.personalDetails.get('phone').value,
        address: {
          city: this.billingDetails.get('city').value,
          country: this.billingDetails.get('country').value,
          line1: this.billingDetails.get('addressLine1').value,
          line2: this.billingDetails.get('addressLine2').value,
          postal_code: this.billingDetails.get('postalCode').value,
          state: this.billingDetails.get('state').value,
        }
      }
    }).subscribe({
      next: (res: PaymentMethodResult) => console.log(res)
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
