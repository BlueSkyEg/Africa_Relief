import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { IAuthedUser } from '../../../shared/interfaces/auth/authed-user.interface';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../../shared/interfaces/auth/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly router: Router = inject(Router);

  authedUserSubject: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

  getToken(): string|null {
    return JSON.parse(localStorage.getItem('accessToken'));
  }

  isTokenExpired(): boolean {
    const tokenExpiresAt = JSON.parse(localStorage.getItem('tokenExpiresAt'));
    if((tokenExpiresAt - (new Date().getTime())) > 5000) {
      return false
    } else {
      return true
    }
  }

  isUserAuthed(): boolean {
    return this.getToken() ? true : false
  }

  getAuthedUser(): Observable<IApiResponse<IUser>> {
    return this.http.get<IApiResponse<IUser>>(environment.apiUrl + '/user');
  }

  updateUserInfo(data): Observable<IApiResponse<IUser>> {
    return this.http.put<IApiResponse<IUser>>(environment.apiUrl + '/user/info', data);
  }

  changeUserImage(data): Observable<IApiResponse<IUser>> {
    return this.http.post<IApiResponse<IUser>>(environment.apiUrl + '/user/img', data);
  }

  changeUserPassword(data): Observable<IApiResponse<IUser>> {
    return this.http.post<IApiResponse<IUser>>(environment.apiUrl + '/change-password', data);
  }

  login(data): Observable<IApiResponse<IAuthedUser>> {
    return this.http.post<IApiResponse<IAuthedUser>>(environment.apiUrl + '/login', data);
  }

  register(data): Observable<IApiResponse<IAuthedUser>> {
    return this.http.post<IApiResponse<IAuthedUser>>(environment.apiUrl + '/register', data);
  }

  logout(): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(environment.apiUrl + '/logout', null);
  }

  forgotPassword(data): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(environment.apiUrl + '/forgot-password', data);
  }

  resetPassword(data): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(environment.apiUrl + '/reset-password', data);
  }

  verifyEmail(verifyParamsUri: string): Observable<IApiResponse<null>> {
    return this.http.get<IApiResponse<null>>(environment.apiUrl + verifyParamsUri);
  }

  checkRedirectUrl(activeRoute: ActivatedRoute) {
    const url = activeRoute.snapshot.queryParams['redirect'];
    if (url) {
      this.router.navigateByUrl(url)
        .catch(() => this.router.navigateByUrl('/home'))
    } else {
      this.router.navigateByUrl('/home')
    }
  }
}
