import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../../shared/interfaces/category-interface';
import { environment } from '../../../../environments/environment.development';
import { IBlogCard } from '../../../shared/interfaces/blog/blog-card-interface';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { IBlog } from '../../../shared/interfaces/blog/blog-interface';
import { IGalleryImage } from '../../../shared/interfaces/blog/gallery-image.interface';
import { IPaginatedData } from '../../../shared/interfaces/paginated-data.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  getBlogCategories(): Observable<IApiResponse<ICategory[]>> {
    return this.http.get<IApiResponse<ICategory[]>>(
      environment.apiUrl + '/blogs/categories'
    );
  }

  getBlogs(
    page: number = 1,
    perPage: number = 9,
    categorySlug: string = null
  ): Observable<IApiResponse<IPaginatedData<IBlogCard[]>>> {
    const queryParams = categorySlug
      ? { page: page, categorySlug: categorySlug, perPage: perPage }
      : { page: page, perPage: perPage };
    return this.http.get<IApiResponse<IPaginatedData<IBlogCard[]>>>(
      environment.apiUrl + '/blogs',
      { params: queryParams }
    );
  }

  getBlog(blogSlug: string): Observable<IApiResponse<IBlog>> {
    return this.http.get<IApiResponse<IBlog>>(
      environment.apiUrl + '/blogs/' + blogSlug
    );
  }

  getRelatedBlogs(blogSlug: string): Observable<IApiResponse<IBlogCard[]>> {
    return this.http.get<IApiResponse<IBlogCard[]>>(
      environment.apiUrl + '/blogs/related/'+blogSlug
    );
  }

  getBlogsGallery(
    page: number,
    perPage: number = 9
  ): Observable<IApiResponse<IPaginatedData<IGalleryImage[]>>> {
    return this.http.get<IApiResponse<IPaginatedData<IGalleryImage[]>>>(
      environment.apiUrl + '/blogs/gallery',
      { params: { page: page, perPage: perPage } }
    );
  }
  searchBlogs(
    searchTerm: string,
    page: number,
    perPage: number = 9
  ): Observable<IApiResponse<IPaginatedData<IBlogCard[]>>> {
    const url = `${environment.apiUrl}/blogs/search/${searchTerm}`;
    const params = {page: page, perPage: perPage};
    return this.http.get<IApiResponse<IPaginatedData<IBlogCard[]>>>(url, {
      params,
    });
  }
}
