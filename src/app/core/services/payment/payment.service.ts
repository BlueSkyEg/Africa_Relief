import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SetupIntent } from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { IPaymentRequiresAction } from '../../../shared/interfaces/payment-requires-action.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  setupPaymentIntent(): Observable<IApiResponse<SetupIntent>> {
    return this.http.get<IApiResponse<SetupIntent>>(environment.apiUrl + '/payment/setup-intent');
  }

  createPayment(data): Observable<IApiResponse<IPaymentRequiresAction>> {
    return this.http.post<IApiResponse<IPaymentRequiresAction>>(environment.apiUrl + '/payment', data);
  }
}
