import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const RedirectIfUnauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return next(req).pipe(
    tap({
      error: err => {
        if (err.status == 401) {
          authService.authedUserSubject.next(null);
          router.navigateByUrl('/login')
        }
      }
    })
  );
};
