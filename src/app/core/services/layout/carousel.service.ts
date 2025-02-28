import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICarouselSlide } from '../../../shared/interfaces/carousel-slide.interface';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(private http: HttpClient) { }

  getHomeCarousel(): Observable<IApiResponse<ICarouselSlide[]>> {
    return this.http.get<IApiResponse<ICarouselSlide[]>>(environment.apiUrl + '/carousels/home_carousel');
  }

  getPartnersSlider(): Observable<IApiResponse<ICarouselSlide[]>> {
    return this.http.get<IApiResponse<ICarouselSlide[]>>(environment.apiUrl + '/carousels/partners_carousel');
  }
}
