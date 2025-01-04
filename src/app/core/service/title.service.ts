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
          const paths = route.url.split('/');
          return event instanceof ActivationEnd && event.snapshot.routeConfig?.path == paths[paths.length - 1];
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
