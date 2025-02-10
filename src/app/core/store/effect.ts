import { Actions, createEffect, ofType } from '@ngrx/effects';
import { logInActions, addressActions, userActions } from './action';
import { catchError, exhaustMap, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { ApiService } from '../service/http.service';
import { Address, AddressSearchKey, LoggedInUser, LoginResponse, User, UserProfile } from '@sc-models/core';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from '../service/cookie.service';
import { initAdminState } from '@sc-modules/admin/state/action';
import { Role } from '@sc-enums/role';
import { initStudentState } from '@sc-modules/students/state/action';
import { initTeacherState } from '@sc-modules/teachers/state/action';
import { selectAddress, selectAddressStates, selectLoggedInUser } from './selector';
import { apiRoutes } from '../constants/api.constants';
import { states } from '../constants/states.constant';
import { SafeToastService } from '../service/safe-toast.service';
import { TOASTER_MESSAGES } from '../constants/toaster_messages.constant';

@Injectable()
export class SharedStoreEffect {
  private readonly action$ = inject(Actions);
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly cookieService = inject(CookieService);
  private readonly toasterService = inject(SafeToastService);

  // #region Login
  logIn = createEffect(() => {
    return this.action$.pipe(
      ofType(logInActions.logIn),
      switchMap(({ logDto }) =>
        this.apiService.post<LoginResponse>(apiRoutes.auth.signin, logDto).pipe(
          map((apiResponse) => {
            const expires = new Date(apiResponse.token.expiresIn * 1000);
            this.cookieService.set('authorization', `${apiResponse.token.accessToken}`, {
              expires,
              sameSite: 'Strict',
              secure: true,
              path: '/',
            });
            return logInActions.logInSuccess({ response: apiResponse });
          }),
        ),
      ),
    );
  });
  logInSuccess = createEffect(() => {
    return this.action$.pipe(
      ofType(logInActions.logInSuccess),
      map(({ response }) => {
        const { user, school, ...userProfile } = response.userProfile;
        const role = user.role;
        this.toasterService.success(TOASTER_MESSAGES.LOGIN_SUCCESS);
        this.router.navigate([role, 'dashboard']);
        return this.handleFeatureState(user.role, userProfile);
      }),
    );
  });
  // #endregion Login

  // #region User profile
  userProfile = createEffect(() => {
    return this.action$.pipe(
      ofType(logInActions.userProfile),
      withLatestFrom(this.store.select(selectLoggedInUser)),
      filter((action) => !action[1]),
      exhaustMap(() =>
        this.apiService.get<LoggedInUser>(apiRoutes.auth.profile).pipe(
          map((response) => logInActions.userProfileSuccess({ response })),
          catchError((error) => of(logInActions.userProfileFailure({ error }))),
        ),
      ),
    );
  });
  userProfileSuccess = createEffect(() => {
    return this.action$.pipe(
      ofType(logInActions.userProfileSuccess),
      map(({ response }) => {
        const { user, school, ...userProfile } = response;
        return this.handleFeatureState(user.role, userProfile);
      }),
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
  // #endregion User Profile

  // #region Address
  address = createEffect(() => {
    return this.action$.pipe(
      ofType(addressActions.loadStates),
      withLatestFrom(this.store.select(selectAddressStates)),
      filter((action) => !action[1].length),
      map(() => addressActions.loadStatesSuccess({ states: Object.keys(states) })),
    );
  });
  districts = createEffect(() => {
    return this.action$.pipe(
      ofType(addressActions.loadDistricts),
      withLatestFrom(this.store.select(selectAddress)),
      filter(([action, addresses]) => !Object.keys(addresses?.[action.state] || {})?.length),
      switchMap(([action]) =>
        this.apiService
          .get<
            string[]
          >(apiRoutes.address.addressKey(AddressSearchKey.DISTRICT), { params: { stateName: action.state } })
          .pipe(
            map((districts) => addressActions.loadDistrictsSuccess({ state: action.state, districts })),
            catchError((error) => of(addressActions.loadDistrictsFailure({ error }))),
          ),
      ),
    );
  });
  pincodes = createEffect(() => {
    return this.action$.pipe(
      ofType(addressActions.loadPincodes),
      withLatestFrom(this.store.select(selectAddress)),
      filter(([action, addresses]) => !Object.keys(addresses[action.state]?.[action.district] || {})?.length),
      switchMap(([action]) =>
        this.apiService
          .get<Address[]>(apiRoutes.address.completeAddress, {
            params: { stateName: action.state, district: action.district },
          })
          .pipe(
            map((addresses) =>
              addressActions.loadPincodesSuccess({ state: action.state, district: action.district, addresses }),
            ),
            catchError((error) => of(addressActions.loadPincodesFailure({ error }))),
          ),
      ),
    );
  });
  // #endregion Address

  // #region Users
  updateUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(userActions.updateUser),
      withLatestFrom(this.store.select(selectLoggedInUser)),
      switchMap(([{ user }, loggedInUser]) =>
        this.apiService.put<User>(apiRoutes.users.update(loggedInUser.id), { ...loggedInUser, ...user }).pipe(
          map((user) => userActions.updateUserSuccess({ user })),
          catchError((err) => of(userActions.updateUserFailure({ error: err }))),
        ),
      ),
    );
  });

  updateUserSuccess$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(userActions.updateUserSuccess),
        tap(() => {
          this.toasterService.success(TOASTER_MESSAGES.UPDATED_SUCCESS);
        }),
      );
    },
    { dispatch: false },
  );
  // #endregion Users

  // #region Logout
  logOut = createEffect(
    () => {
      return this.action$.pipe(
        ofType(logInActions.logOut),
        tap(() => {
          if (typeof window !== 'undefined') {
            localStorage.clear();
            sessionStorage.clear();
          }
          this.toasterService.success(TOASTER_MESSAGES.LOGOUT_SUCCESS);
          this.cookieService.deleteAll();
          this.router.navigate(['']);
        }),
      );
    },
    { dispatch: false },
  );
  // #endregion Logout

  // #region Helpers
  private handleFeatureState(role: Role, userProfile: UserProfile) {
    switch (role) {
      case Role.ADMIN:
        return initAdminState({ adminProfile: userProfile });
      case Role.TEACHER:
        return initTeacherState({ teacherProfile: userProfile });
      case Role.STUDENT:
        return initStudentState({ studentProfile: userProfile });
    }
  }
  // #endregion Helpers
}
