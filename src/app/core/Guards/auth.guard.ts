import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if(authService.isTokenExpired()) {
    localStorage.clear();
    router.navigate(['/login'], {queryParams: {'redirectUrl': state.url}});
    return false;
  }

  return true;
};
