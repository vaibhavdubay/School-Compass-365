import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(SsrCookieService);
  const authToken = cookieService.get('authorization');
  if (authToken) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` },
    });

    return next(authReq);
  }
  return next(req);
};
