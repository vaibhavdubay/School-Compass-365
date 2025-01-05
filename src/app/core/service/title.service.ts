import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, filter } from 'rxjs';
import { SharedStoreService } from './shared-store.service';
import { Role } from '@sc-enums/role';
import { ActivationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private readonly titleService = inject(Title);

  private readonly _title = new BehaviorSubject('Dashboard');
  title$ = this._title.asObservable();
  mainTitle: string = 'School Compass 365';
  constructor() {
    const route = inject(Router);
    const sharedStore = inject(SharedStoreService);

    route.events
      .pipe(
        filter((event) => {
          if (!(event instanceof ActivationEnd)) return false;
          const paths = route.url.split('/');
          const snapshot = event.snapshot;
          const routerPath =
            snapshot.routeConfig?.path == '' ? snapshot['parent']?.routeConfig?.path : snapshot.routeConfig?.path;
          if (routerPath && routerPath.split('/').length > 1) {
            return routerPath.split('/').reverse().every((route, i) => route.includes(':') || route == paths[paths.length - (1 + i)] )
          }
          return routerPath == paths[paths.length - 1] && event.snapshot.data?.['title'];
        }),
      )
      .subscribe((event) => {
        if (event instanceof ActivationEnd) {
          const data = event.snapshot.data;
          if (data?.['title']) {
            this.title = data['title'];
          }
        }
      });
    sharedStore.loggedInUserWithSchool$
      .pipe(filter(({ loggedInUser }) => loggedInUser.role !== Role.ADMIN))
      .subscribe(({ schoolProfile }) => {
        this.mainTitle = schoolProfile.name
          .split(' ')
          .map((s) => s[0])
          .join('');
      });
  }

  set title($value: string) {
    this.titleService.setTitle(`${this.mainTitle} | ${$value}`);
    this._title.next($value);
  }
}
