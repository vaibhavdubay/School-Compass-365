import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { logInActions } from './action';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { ApiService } from '../service/http.service';
import { LoggedInUser, LoginResponse } from '@sc-models/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectLoggedInUser } from './selector';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable()
export class SharedStoreEffect {
  constructor(
    private action$: Actions,
    private apiService: ApiService,
    private router: Router,
    private store: Store,
    private cookieService: SsrCookieService,
  ) {}

  logIn = createEffect(() => {
    return this.action$.pipe(
      ofType(logInActions.logIn),
      switchMap(({ role, logDto }) =>
        this.apiService
          .post<LoginResponse>(`/auth/${role}/login`, logDto)
          .pipe(map((response) => logInActions.logInSuccess({ response }))),
      ),
    );
  });

  logInSuccess = createEffect(
    () => {
      return this.action$.pipe(
        ofType(logInActions.logInSuccess),
        tap(({ response }) => {
          const role = response.user.role;
          this.router.navigate([role, 'dashboard']);
          this.cookieService.set('authorization', response.accessToken, {
            expires: 500,
            sameSite: 'Strict',
            secure: true,
            path: '/',
          });
        }),
      );
    },
    { dispatch: false },
  );

  userProfile = createEffect(() => {
    return this.action$.pipe(
      ofType(logInActions.userProfile),
      concatLatestFrom(() => this.store.select(selectLoggedInUser)),
      filter((action) => !action[1]),
      switchMap(() =>
        this.apiService.get<LoggedInUser>(`/auth/user-profile`).pipe(
          map((response) => logInActions.userProfileSuccess({ response })),
          catchError((error) => of(logInActions.userProfileFailure({ error }))),
        ),
      ),
    );
  });

  userProfileFailure = createEffect(
    () => {
      return this.action$.pipe(
        ofType(logInActions.userProfileFailure),
        tap(() => {
          if (typeof window !== 'undefined') {
            localStorage.clear();
            sessionStorage.clear();
          }
          this.cookieService.deleteAll();
          this.router.navigate(['']);
        }),
      );
    },
    { dispatch: false },
  );
}
