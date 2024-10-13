import {  Component, computed, inject, signal, ViewChild } from '@angular/core';
import { LabelComponent } from "../../../../shared/components/form/label/label.component";
import { FieldComponent } from "../../../../shared/components/form/field/field.component";
import { IApiResponse } from '../../../../shared/interfaces/api-response-interface';
import { IStripeIntent } from '../../../../shared/interfaces/payment/stripe-intent.interface';
import { PaymentMethodResult, StripeCardCvcElementChangeEvent, StripeCardElementOptions, StripeCardExpiryElementChangeEvent, StripeCardNumberElementChangeEvent, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardCvcComponent, StripeCardExpiryComponent, StripeCardGroupDirective, StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { PaymentService } from '../../../../core/services/payment/payment.service';
import { FormElementDirective } from '../../../../shared/directives/form-element.directive';
import { ErrorComponent } from "../../../../shared/components/form/error/error.component";
import { Observable } from 'rxjs';
import { IBillingDetails } from '../../../../shared/interfaces/payment/billing-details.interface';

@Component({
  selector: 'app-card-elements',
  standalone: true,
  imports: [
    LabelComponent,
    FieldComponent,
    FormElementDirective,
    StripeCardNumberComponent,
    StripeCardCvcComponent,
    StripeCardExpiryComponent,
    StripeCardGroupDirective,
    ErrorComponent,
  ],
  templateUrl: './card-elements.component.html',
  styles: ``,
})
export class CardElementsComponent {
  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;

  paymentService: PaymentService = inject(PaymentService);
  _stripeService: StripeService = inject(StripeService);

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };
  isLoading = true;

  ngOnInit(): void {
    this.paymentService.setupPaymentIntent().subscribe({
      next: (res: IApiResponse<IStripeIntent>) => {
        this.elementsOptions.clientSecret = res.data.client_secret;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false; 
      },
    });
  }

  // Create Payment Method on Stripe
  createPaymentMethod(
    billingDetails: IBillingDetails
  ): Observable<PaymentMethodResult> {
    return this._stripeService.createPaymentMethod({
      type: 'card',
      card: this.card.element,
      billing_details: {
        name: billingDetails.name,
        email: billingDetails.email,
        phone: billingDetails.phone,
        address: {
          city: billingDetails.city,
          country: billingDetails.country,
          line1: billingDetails.addressLine1,
          line2: billingDetails.addressLine2,
          postal_code: billingDetails.postalCode,
          state: billingDetails.state,
        },
      },
    });
  }

  // Handel Payment Card Errors
  cardNumberError = signal<string>(' ');
  cardExpiryError = signal<string>(' ');
  cardCvvError = signal<string>(' ');
  isCardValid = computed(
    () =>
      !this.cardNumberError() && !this.cardExpiryError() && !this.cardCvvError()
  );

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
