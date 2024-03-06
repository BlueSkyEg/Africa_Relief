import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { IAuthedUser } from '../../../shared/interfaces/auth/authed-user.interface';
import { environment } from '../../../../environments/environment';
import { LoginCredentials } from '../../../shared/interfaces/auth/login-credentials.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authedUserSubject: Subject<IAuthedUser> = new Subject<IAuthedUser>();

  login(data): Observable<IApiResponse<IAuthedUser>> {
    return this.http.post<IApiResponse<IAuthedUser>>(environment.apiUrl + '/login', data);
  }
}
