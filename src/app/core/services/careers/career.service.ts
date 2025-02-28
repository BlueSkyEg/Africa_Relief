import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICareer } from '../../../shared/interfaces/career/career.interface';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { environment } from '../../../../environments/environment.development';
import { IPaginatedData } from '../../../shared/interfaces/paginated-data.interface';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private http: HttpClient) { }

  getCareers(page: number, perPage: number = 6): Observable<IApiResponse<IPaginatedData<ICareer[]>>> {
    return this.http.get<IApiResponse<IPaginatedData<ICareer[]>>>(environment.apiUrl + '/careers', {params: {page: page, perPage: perPage}})
  }

  getCareer(careerSlug: string): Observable<IApiResponse<ICareer>> {
    return this.http.get<IApiResponse<ICareer>>(environment.apiUrl + '/careers/' + careerSlug)
  }
}
