import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  http: HttpClient = inject(HttpClient);

  submitContactForm(body): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(environment.apiUrl + '/contacts/store', body);
  }
}
