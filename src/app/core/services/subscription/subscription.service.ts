import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { ISubscription } from '../../../shared/interfaces/subscription.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient)
  {
  }

  getUserSubscriptions(): Observable<IApiResponse<ISubscription[]>> {
    return this.http.get<IApiResponse<ISubscription[]>>(environment.apiUrl + '/user/subscriptions')
  }

  cancelSubscription(SubscriptionId: string): Observable<IApiResponse<null>> {
    return this.http.delete<IApiResponse<null>>(environment.apiUrl + `/user/subscriptions/${SubscriptionId}`)
  }
}
