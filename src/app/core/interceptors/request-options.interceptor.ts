import { HttpInterceptorFn } from '@angular/common/http';

export const RequestOptionsInterceptor: HttpInterceptorFn = (req, next) => {
  req.clone({
    setHeaders: {
      // "content-Type": "application/json",
      "accept": "application/json",
    }
  })
  return next(req);
};
