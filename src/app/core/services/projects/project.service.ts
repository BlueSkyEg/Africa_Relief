import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ICategory } from '../../../shared/interfaces/category-interface';
import { IProjectCard } from '../../../shared/interfaces/project-card-interface';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjectCategories(): Observable<IApiResponse<ICategory[]>> {
    return this.http.get<IApiResponse<ICategory[]>>(environment.apiUrl + '/projects/data/project-categories.json');
  }

  getProjects(projectSlug: string|null): Observable<IApiResponse<IProjectCard[]>> {
    if(!projectSlug) {
      return this.http.get<IApiResponse<IProjectCard[]>>(environment.apiUrl + '/projects/data/projects-cards.json');
    }
    return this.http.get<IApiResponse<IProjectCard[]>>(environment.apiUrl + '/projects/data/category-projects-cards/' + projectSlug + '.json');
  }
}
