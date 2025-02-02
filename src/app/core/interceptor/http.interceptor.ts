import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { CookieService } from '../service/cookie.service';
import { catchError, of } from 'rxjs';
import { SafeToastService } from '../service/safe-toast.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const toasterService = inject(SafeToastService);
  const authToken = cookieService.get('authorization');
  let request = req;
  if (authToken) {
    request = req.clone({
      setHeaders: { authorization: `Bearer ${authToken}` },
    });
  }
  return next(request).pipe(
    catchError((error) => {
      toasterService.error(error?.error?.message || error?.message);
      return of(error);
    })
  )
};
