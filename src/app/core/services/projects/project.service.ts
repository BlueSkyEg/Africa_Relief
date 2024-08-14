import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ICategory } from '../../../shared/interfaces/category-interface';
import { IProjectCard } from '../../../shared/interfaces/project/project-card-interface';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { IProject } from '../../../shared/interfaces/project/project-interface';
import { IPaginatedData } from '../../../shared/interfaces/paginated-data.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjectCategories(): Observable<IApiResponse<ICategory[]>> {
    return this.http.get<IApiResponse<ICategory[]>>(environment.apiUrl + '/projects/categories');
  }

  getProjects(page: number = 1, perPage: number = 9, categorySlug: string = null): Observable<IApiResponse<IPaginatedData<IProjectCard[]>>> {
    const queryParams = categorySlug
    ? {page: page, categorySlug: categorySlug, perPage: perPage}
    : {page: page, perPage: perPage};
    return this.http.get<IApiResponse<IPaginatedData<IProjectCard[]>>>(environment.apiUrl + '/projects', {params: queryParams});
  }

  getProject(projectSlug: string): Observable<IApiResponse<IProject>> {
    return this.http.get<IApiResponse<IProject>>(environment.apiUrl + '/projects/' + projectSlug);
  }

  getRelatedProjects(projectSlug: string): Observable<IApiResponse<IProjectCard[]>> {
    return this.http.get<IApiResponse<IProjectCard[]>>(environment.apiUrl + '/projects/related/' + projectSlug);
  }

  // searchProjects(term: string): Observable<IProjectCard[]> {
  //   return this.http.get<IProjectCard[]>(`${environment.apiUrl}/projects/search`, { params: { term } });
  // }
}
