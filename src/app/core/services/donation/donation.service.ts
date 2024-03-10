import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { IDonation } from '../../../shared/interfaces/donation.interface';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private http: HttpClient)
  {}

  getUserDonations(): Observable<IApiResponse<IDonation[]>> {
    return this.http.get<IApiResponse<IDonation[]>>(environment.apiUrl + '/user/donations')
  }
}
