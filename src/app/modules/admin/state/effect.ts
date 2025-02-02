import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'src/app/core/service/http.service';
import { adminActions, classes as classAction, school as schoolActions } from './action';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Class } from '@sc-models/core';
import { apiRoutes } from 'src/app/core/constants/api.constants';
import { selectClasses } from './selector';
import { AdminService } from '../services/admin.service';
import { SchoolProfile } from '@sc-models/school';
import { AdminUser } from '@sc-models/admin';

@Injectable()
export class AdminEffects {
  private readonly actions$ = inject(Actions);
  private readonly apiService = inject(ApiService);
  private readonly store = inject(AdminService);

  getAllClasses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(classAction.getAll),
      withLatestFrom(this.store.select(selectClasses)),
      filter(([_, classes]) => !classes?.length),
      switchMap(() =>
        this.apiService.get<Class[]>(apiRoutes.class.get).pipe(
          map((classes) => classAction.getAllSuccess({ classes })),
          catchError((err) => of(classAction.getAllFailure({ error: err }))),
        ),
      ),
    );
  });
  updateSchoolProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(schoolActions.updateSchool),
      switchMap(({ school }) =>
        this.apiService.put<SchoolProfile>(apiRoutes.school.update(school.id as string), school).pipe(
          map((school) => schoolActions.updateSchoolSuccess({ school })),
          catchError((err) => of(schoolActions.updateSchoolFailure({ error: err }))),
        ),
      ),
    );
  });

  updateAdminProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminActions.updateAdmin),
      switchMap(({ adminUser }) =>
        this.apiService.put<AdminUser>(apiRoutes.admin.update(adminUser.id as string), adminUser).pipe(
          map((adminUser) => adminActions.updateAdminSuccess({ adminUser })),
          catchError((err) => of(adminActions.updateAdminFailure({ error: err }))),
        ),
      ),
    );
  });
}
