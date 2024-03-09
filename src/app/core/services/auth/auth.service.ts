import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, of, switchMap } from 'rxjs';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { IAuthedUser } from '../../../shared/interfaces/auth/authed-user.interface';
import { environment } from '../../../../environments/environment';
import { LoginCredentials } from '../../../shared/interfaces/auth/login-credentials.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  authedUserSubject: Subject<IAuthedUser> = new Subject<IAuthedUser>();

  login(data): Observable<IApiResponse<IAuthedUser>> {
    return this.http.post<IApiResponse<IAuthedUser>>(environment.apiUrl + '/login', data);
  }

  register(data): Observable<IApiResponse<IAuthedUser>> {
    return this.http.post<IApiResponse<IAuthedUser>>(environment.apiUrl + '/register', data);
  }

  forgotPassword(data): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(environment.apiUrl + '/forgot-password', data);
  }

  resetPassword(data): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(environment.apiUrl + '/reset-password', data);
  }

  verifyEmail(url): Observable<IApiResponse<null>> {
    return this.http.get<IApiResponse<null>>(url);
  }

  isTokenExpired(): boolean {
    const tokenExpiresAt = JSON.parse(localStorage.getItem('tokenExpiresAt'));
    if((tokenExpiresAt - (new Date().getTime())) > 5000) {
      return false
    } else {
      return true
    }
  }

  checkRedirectUrl(activeRoute: ActivatedRoute) {
    const url = activeRoute.snapshot.queryParams['redirectUrl'];
    if (url) {
      this.router.navigateByUrl(url)
        .catch(() => this.router.navigateByUrl('/home'))
    } else {
      this.router.navigateByUrl('/home')
    }
  }
}
