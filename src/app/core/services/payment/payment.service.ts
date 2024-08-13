import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { IStripeIntent } from '../../../shared/interfaces/payment/stripe-intent.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  setupPaymentIntent(): Observable<IApiResponse<IStripeIntent>> {
    return this.http.get<IApiResponse<IStripeIntent>>(environment.apiUrl + '/payment/setup-intent');
  }

  createPayment(data): Observable<IApiResponse<IStripeIntent>> {
    return this.http.post<IApiResponse<IStripeIntent>>(environment.apiUrl + '/payment', data);
  }

  createExpressCheckoutPayment(data): Observable<IApiResponse<IStripeIntent>> {
    return this.http.post<IApiResponse<IStripeIntent>>(environment.apiUrl + '/payment/express-checkout', data);
  }
}
