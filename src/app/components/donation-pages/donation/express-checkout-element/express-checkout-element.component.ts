import { Component, Inject, inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { injectStripe, StripeElementsDirective, StripeExpressCheckoutComponent } from 'ngx-stripe';
import { environment } from '../../../../../environments/environment';
import { PaymentIntentResult, StripeElementsOptions, StripeExpressCheckoutElementClickEvent, StripeExpressCheckoutElementConfirmEvent, StripeExpressCheckoutElementOptions } from '@stripe/stripe-js';
import { PaymentService } from '../../../../core/services/payment/payment.service';
import { IApiResponse } from '../../../../shared/interfaces/api-response-interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { IStripeIntent } from '../../../../shared/interfaces/payment/stripe-intent.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-express-checkout-element',
  standalone: true,
  imports: [StripeElementsDirective, StripeExpressCheckoutComponent],
  templateUrl: './express-checkout-element.component.html',
  styles: ``,
})
export class ExpressCheckoutElementComponent {
  @ViewChild(StripeExpressCheckoutComponent)
  expressCheckout!: StripeExpressCheckoutComponent;
  @Input() amount: number;
  @Input() donationFormId: string;
  @Input() recurringPeriod: string;

  paymentService: PaymentService = inject(PaymentService);
  _stripe = injectStripe(environment.stripePublicKey);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  _gtmService: GoogleTagManagerService = inject(GoogleTagManagerService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  elementsOptions: StripeElementsOptions;
  options: StripeExpressCheckoutElementOptions = {
    buttonType: {
      applePay: 'donate',
      googlePay: 'donate',
    },
  };
  ngOnInit(): void {
    this.elementsOptions = {
      mode: this.recurringPeriod ? 'subscription' : 'payment',
      amount: this.amount * 100,
      currency: 'usd',
      locale: 'en',
    };
  }

  onClicked(event: StripeExpressCheckoutElementClickEvent) {
    const options = {
      emailRequired: true,
      phoneNumberRequired: true,
    };
    event.resolve(options);
  }

  onConfirm(event: StripeExpressCheckoutElementConfirmEvent) {
    const { billingDetails } = event;

    // Set donationStarted key in session storage
    // to be indicator for donation confirmation and failed pages
    // if the user visit them directely or redirected during the donation
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('donationStarted', JSON.stringify(true));
    }
    const data = {
      name: billingDetails.name,
      email: billingDetails.email,
      amount: this.amount,
      donationFormId: this.donationFormId,
      recurringPeriod: this.recurringPeriod,
    };

    this.paymentService.createExpressCheckoutPayment(data).subscribe({
      next: (res: IApiResponse<IStripeIntent>) => {
        this._stripe
          .confirmPayment({
            elements: this.expressCheckout.elements,
            clientSecret: res.data.client_secret,
            confirmParams: {
              return_url: `${environment.appUrl}/donation-confirmation`,
            },
          })
          .subscribe({
            next: (res: PaymentIntentResult) => {
              if (res.paymentIntent.status === 'succeeded') {
                this.pushTagConfirmDonationEvent();
              } else {
                this._snackBar.open('Your card was declined.', '✖', {
                  panelClass: 'failure-snackbar',
                });
                this.pushTagFailedDonationEvent(res.error.message);
              }
            },
          });
      },
    });
  }

  // Push Google Tag Manager Donation Confirmation Event
  pushTagConfirmDonationEvent(): void {
    const gtmTag = {
      event: 'donationConfirmation',
      donationAmount: this.amount,
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
}
