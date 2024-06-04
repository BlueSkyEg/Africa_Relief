import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  http: HttpClient = inject(HttpClient);

  submitVolunteerForm(application): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(environment.apiUrl + '/volunteers/store', application);
  }
}
