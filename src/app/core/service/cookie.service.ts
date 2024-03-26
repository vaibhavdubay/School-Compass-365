import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { Request } from 'express';

@Injectable({ providedIn: 'root' })
export class CookieService {
  isBrowser: boolean = false;
  private serverCookies!: { [k: string]: string };

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    @Optional() @Inject('REQUEST') req: Request,
  ) {
    const serverCookies: string = req?.headers?.cookie || '';
    if (serverCookies) {
      this.serverCookies = this.parseCookies(serverCookies);
    }
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get cookie(): { [name: string]: string } {
    return (
      (this.isBrowser
        ? this.parseCookies(document.cookie)
        : this.serverCookies) || {}
    );
  }

  private parseCookies(cookiesString: string): { [k: string]: string } {
    const cookies: { [k: string]: string } = {};
    const pairs = cookiesString.split(';');
    pairs.forEach((pair) => {
      const [key, value] = pair.trim().split('=');
      cookies[key] = decodeURIComponent(value);
    });
    return cookies;
  }
}
