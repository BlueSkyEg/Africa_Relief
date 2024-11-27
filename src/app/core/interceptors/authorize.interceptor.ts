import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const AuthorizeInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = Inject(AuthService);
  let platformId = inject(PLATFORM_ID);
  let isBrowser = isPlatformBrowser(platformId);

  return next(req).pipe(
    tap({
      error: (err) => {
        if (err.status !== 401) return;
        if (isBrowser) {
          localStorage.clear();
        }
        authService.authedUserSubject.next(null);
      },
    })
  );
};
