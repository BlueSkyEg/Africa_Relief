import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { ISubscription } from '../../../shared/interfaces/subscription.interface';
import { environment } from '../../../../environments/environment';

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
}