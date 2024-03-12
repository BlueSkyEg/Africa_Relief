import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentIntent } from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  setupPaymentIntent(): Observable<IApiResponse<PaymentIntent>> {
    return this.http.get<IApiResponse<PaymentIntent>>(environment.apiUrl + '/payment-method/setup-intent');
  }
}
