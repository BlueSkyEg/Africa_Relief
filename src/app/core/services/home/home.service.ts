import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMainSliderSlide} from "../../interfaces/home/main-slider-slide-interface";
import {environment} from "../../../../environments/environment";
import {IBlog} from "../../../shared/interfaces/blog-interface";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getMainSliderSlides(): Observable<IMainSliderSlide[]> {
    return this.http.get<IMainSliderSlide[]>(environment.apiUrl + '/home-slider/home-slider.json');
  }

  getLatestBlogs(): Observable<IBlog[]> {
    return this.http.get<IBlog[]>(environment.apiUrl + '/home-latest-blogs/home-latest-blogs.json');
  }
}
