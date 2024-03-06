import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICareer } from '../../../shared/interfaces/career.interface';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private http: HttpClient) { }

  getCareers(): Observable<IApiResponse<ICareer[]>> {
    return this.http.get<IApiResponse<ICareer[]>>('/assets/db/careers/careers.json')
  }

  getCareer(careerSlug: string): Observable<IApiResponse<ICareer>> {
    return this.http.get<IApiResponse<ICareer>>(`/assets/db/careers/${careerSlug}.json`)
  }
}
