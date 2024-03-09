import { HttpInterceptorFn } from '@angular/common/http';
import { LayoutService } from '../services/layout/layout.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const layoutService: LayoutService = inject(LayoutService);

  layoutService.loaderSubject.next(true);

  return next(req).pipe(
    finalize(() => layoutService.loaderSubject.next(false))
  );
};
