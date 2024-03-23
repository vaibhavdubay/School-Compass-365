import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export const authGuard: CanMatchFn = () => {
  const cookieService = inject(SsrCookieService);
  const authToken = cookieService.get('authorization');
  if (!authToken) return false;
  const data = JSON.parse(atob(authToken.split('.')?.[1]) || '{}');
  if (data?.exp) {
    const exp = new Date(data.exp * 1000);
    const now = new Date();
    return exp > now;
  }
  return false;
};
