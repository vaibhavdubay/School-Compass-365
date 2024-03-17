import { Injectable, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
type ScreenBreakpoint = 'Unknown' | 'Handset' | 'Tablet' | 'Web';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeObserver implements OnDestroy {
  private destroyed = new Subject<void>();
  private currentScreenSize: ScreenBreakpoint = 'Unknown';
  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktop: boolean = false;
  private displayNameMap: { [k: string]: ScreenBreakpoint } = {
    [Breakpoints.Handset]: 'Handset',
    [Breakpoints.Tablet]: 'Tablet',
    [Breakpoints.Web]: 'Web',
  };

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        Object.keys(result.breakpoints)
          .filter((q) => result.breakpoints[q])
          .forEach((query) => {
            const key = Object.keys(this.displayNameMap).find((k) =>
              k.includes(query),
            );
            this.currentScreenSize = key ? this.displayNameMap[key] : 'Unknown';
          });
        this.isMobile = this.currentScreenSize === 'Handset';
        this.isTablet = this.currentScreenSize === 'Tablet';
        this.isDesktop = ['Web', 'Unknown'].includes(this.currentScreenSize);
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
