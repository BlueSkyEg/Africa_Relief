import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { IDonationForm } from '../../../shared/interfaces/donation/donation-form.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonationFormService {

  constructor(private http: HttpClient) { }

  getHomeDonationForm(): Observable<IApiResponse<IDonationForm>> {
    return this.http.get<IApiResponse<IDonationForm>>(environment.apiUrl + '/donation-forms/home');
  }
}
