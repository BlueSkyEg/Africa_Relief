import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../../shared/interfaces/category-interface';
import { environment } from '../../../../environments/environment';
import { IBlogCard } from '../../../shared/interfaces/blog-card-interface';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogCategories(): Observable<IApiResponse<ICategory[]>> {
    return this.http.get<IApiResponse<ICategory[]>>(environment.apiUrl + '/blogs/data/blog-categories.json');
  }

  getBlogs(categorySlug: string|null): Observable<IApiResponse<IBlogCard[]>> {
    if(!categorySlug) {
      return this.http.get<IApiResponse<IBlogCard[]>>(environment.apiUrl + '/blogs/data/blogs-cards.json');
    }
    return this.http.get<IApiResponse<IBlogCard[]>>(environment.apiUrl + '/blogs/data/category-blogs-cards/' + categorySlug + '.json');
  }

  getLatestBlogs(): Observable<IApiResponse<IBlogCard[]>> {
    return this.http.get<IApiResponse<IBlogCard[]>>(environment.apiUrl + '/blogs/data/latest-blogs.json');
  }
}