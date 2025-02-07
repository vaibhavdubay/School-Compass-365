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
      const errorMsg = Array.isArray(error?.error?.message)
        ? error?.error?.message
            .reduce((acc: string[], err: string) => {
              const errorIndex = acc.findIndex((e) => err.includes(e.split(' ')[0]));
              if (errorIndex === -1) {
                acc.push(err);
              } else if (err.includes('not be empty')) {
                acc[errorIndex] = err;
              }
              return acc;
            }, [])
            .join(',\n')
        : error?.error?.message || error?.message;
      toasterService.error(errorMsg);
      return of(error);
    }),
  );
};
