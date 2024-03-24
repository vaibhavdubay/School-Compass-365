import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { CookieService } from '../service/cookie.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const authToken = cookieService.cookies('authorization');
  // if (!cookieService.isBrowser) return EMPTY;
  if (authToken) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` },
    });

    return next(authReq);
  }
  return next(req);
};
