import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  http: HttpClient = inject(HttpClient);

  submitContactForm(body): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(environment.apiUrl + '/contacts/store', body);
  }
}
