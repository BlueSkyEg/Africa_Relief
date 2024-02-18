import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../../shared/interfaces/category-interface';
import { environment } from '../../../../environments/environment';
import { IBlogCard } from '../../../shared/interfaces/blog-card-interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(environment.apiUrl + '/blogs/data/blog-categories.json');
  }

  getBlogs(categorySlug: string|null): Observable<IBlogCard[]> {
    if(!categorySlug) {
      return this.http.get<IBlogCard[]>(environment.apiUrl + '/blogs/data/blogs-cards.json');
    }
    return this.http.get<IBlogCard[]>(environment.apiUrl + '/blogs/data/category-blogs-cards/' + categorySlug + '.json');
  }
}
