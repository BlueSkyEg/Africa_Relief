import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const RequestOptionsInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const accessToken = authService.getToken();

  req = req.clone({
    setHeaders: {
      'Accept': 'application/json',
    }
  });

  if(accessToken) {
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
  }

  return next(req);
};
