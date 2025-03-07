import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  http: HttpClient = inject(HttpClient);

  submitVolunteerForm(application: FormData): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(environment.apiUrl + '/job-applications/store', application);
  }
}
