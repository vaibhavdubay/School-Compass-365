import { Actions, createEffect, ofType } from '@ngrx/effects';
import { logInActions } from './action';
import { map, switchMap, tap } from 'rxjs';
import { ApiService } from '../service/http.service';
import { LoginResponse } from '@sc-models/core';
import { Injectable } from '@angular/core';

@Injectable()
export class SharedStoreEffect {
  constructor(private action$: Actions, private apiService: ApiService) {}

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
          this.setSecureCookie(response.accessToken);
        }),
      );
    },
    { dispatch: false },
  );

  private setSecureCookie(accessToken: string) {
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24).toUTCString();
    document.cookie = `authorization=${accessToken}; expires=${expires}; path=/; Secure; HttpOnly; SameSite=Strict`;
  }
}
