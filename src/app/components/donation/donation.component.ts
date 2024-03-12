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
import { PaymentIntent, StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
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
        billingComment: ['']
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

  pay(){
    this.stripeService.createPaymentMethod({
      type: "card",
      card: this.card.element,
      billing_details: {
        name: 'Mohamed Elsayeh',
        email: 'zinhom999999@gmail.com',
        phone: '01010181734',
        address: {
          city: 'Alexandria',
          country: 'EG',
          line1: 'Abd allah ibn masoud st',
          line2: null,
          postal_code: '21539',
          state: 'Alasfraaa'
        }
      }
    }).subscribe({
      next: res => console.log(res)
    })
  }
}
