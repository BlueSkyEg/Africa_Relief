import { HttpInterceptorFn } from '@angular/common/http';
import { Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

export const AuthorizeInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = Inject(AuthService);

  return next(req).pipe(tap({
    error: err => {
      if(err.status !== 401) return;

      localStorage.clear();
      authService.authedUserSubject.next(null);
    }
  }))
};
