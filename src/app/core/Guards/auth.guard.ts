import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  let platformId = inject(PLATFORM_ID);
  let isBrowser = isPlatformBrowser(platformId);

  if (authService.isTokenExpired()) {
    if (isBrowser) {
      localStorage.clear();
    }
    router.navigate(['/login'], { queryParams: { redirect: state.url } });
    return false;
  }

  return true;
};
