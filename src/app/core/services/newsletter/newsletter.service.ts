import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  http: HttpClient = inject(HttpClient);

  subscribeToNewsletter(email): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(environment.apiUrl + '/newsletter/subscribe', email)
  }

  unsubscribeFromNewsletter(email): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(environment.apiUrl + '/newsletter/unsubscribe', email)
  }
}
