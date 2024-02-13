import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMainSliderSlide} from "../../interfaces/home/main-slider-slide-interface";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getMainSliderSlides(): Observable<IMainSliderSlide[]> {
    return this.http.get<IMainSliderSlide[]>('/assets/db/home-slider/home-slider.json');
  }
}
