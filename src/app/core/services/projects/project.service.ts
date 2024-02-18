import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ICategory } from '../../../shared/interfaces/category-interface';
import { IProjectCard } from '../../../shared/interfaces/project-card-interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjectCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(environment.apiUrl + '/projects/data/project-categories.json');
  }

  getProjects(): Observable<IProjectCard[]> {
    return this.http.get<IProjectCard[]>(environment.apiUrl + '/projects/data/projects-cards.json');
  }
}
