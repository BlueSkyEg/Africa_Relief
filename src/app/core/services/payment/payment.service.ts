import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { IStripeIntent } from '../../../shared/interfaces/payment/stripe-intent.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  setupPaymentIntent(): Observable<IApiResponse<IStripeIntent>> {
    return this.http.get<IApiResponse<IStripeIntent>>(environment.apiUrl + '/payment/setup-intent');
  }

  createPayment(data:any): Observable<IApiResponse<IStripeIntent>> {
    return this.http.post<IApiResponse<IStripeIntent>>(environment.apiUrl + '/payment', data);

  }

  createExpressCheckoutPayment(data:any): Observable<IApiResponse<IStripeIntent>> {
    return this.http.post<IApiResponse<IStripeIntent>>(environment.apiUrl + '/payment/express-checkout', data);
  }
}
