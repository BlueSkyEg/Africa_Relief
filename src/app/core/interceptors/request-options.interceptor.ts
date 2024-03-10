import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const RequestOptionsInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const accessToken = authService.getToken();
  req = req.clone({
    setHeaders: {
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Authorization': accessToken ? `Bearer ${accessToken}` : null
    }
  })

  return next(req);
};
