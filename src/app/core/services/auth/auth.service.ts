import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { IAuthedUser } from '../../../shared/interfaces/auth/authed-user.interface';
import { environment } from '../../../../environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../../shared/interfaces/auth/user.interface';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly router: Router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  authedUserSubject: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('accessToken'));
    }
    return null;
  }

  isTokenExpired(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const tokenExpiresAt = JSON.parse(localStorage.getItem('tokenExpiresAt'));
      return tokenExpiresAt - new Date().getTime() <= 5000;
    }
    return true;
  }

  isUserAuthed(): boolean {
    return this.getToken() ? true : false;
  }

  getAuthedUser(): Observable<IApiResponse<IUser>> {
    return this.http.get<IApiResponse<IUser>>(environment.apiUrl + '/user');
  }

  updateUserInfo(data): Observable<IApiResponse<IUser>> {
    return this.http.put<IApiResponse<IUser>>(
      environment.apiUrl + '/user/info',
      data
    );
  }

  changeUserImage(data): Observable<IApiResponse<IUser>> {
    return this.http.post<IApiResponse<IUser>>(
      environment.apiUrl + '/user/img',
      data
    );
  }

  changeUserPassword(data): Observable<IApiResponse<IUser>> {
    return this.http.post<IApiResponse<IUser>>(
      environment.apiUrl + '/change-password',
      data
    );
  }

  login(data): Observable<IApiResponse<IAuthedUser>> {
    return this.http.post<IApiResponse<IAuthedUser>>(
      environment.apiUrl + '/login',
      data
    );
  }

  register(data): Observable<IApiResponse<IAuthedUser>> {
    return this.http.post<IApiResponse<IAuthedUser>>(
      environment.apiUrl + '/register',
      data
    );
  }

  logout(): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(
      environment.apiUrl + '/logout',
      null
    );
  }

  forgotPassword(data): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(
      environment.apiUrl + '/forgot-password',
      data
    );
  }

  resetPassword(data): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(
      environment.apiUrl + '/reset-password',
      data
    );
  }

  verifyEmail(verifyParamsUri: string): Observable<IApiResponse<null>> {
    return this.http.get<IApiResponse<null>>(
      environment.apiUrl + verifyParamsUri
    );
  }

  checkRedirectUrl(activeRoute: ActivatedRoute) {
    const url = activeRoute.snapshot.queryParams['redirect'];
    if (url) {
      this.router
        .navigateByUrl(url)
        .catch(() => this.router.navigateByUrl('/home'));
    } else {
      this.router.navigateByUrl('/home');
    }
  }


  DeleteAccount(): Observable<IApiResponse<null>> {
    const accessToken = this.getToken(); // Get the token from localStorage
    if (!accessToken) {
      throw new Error('No access token found. User might not be authenticated.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.http.delete<IApiResponse<null>>(environment.apiUrl + '/user', { headers });
  }


}
