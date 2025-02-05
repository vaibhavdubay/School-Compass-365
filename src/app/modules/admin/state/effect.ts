import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'src/app/core/service/http.service';
import {
  adminActions,
  classes as classAction,
  school as schoolActions,
  teachersAction,
  studentAction,
  classes,
} from './action';
import { catchError, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { AdminUser, Class, SchoolProfile, StudentProfile, TeacherProfile } from '@sc-models/core';
import { apiRoutes } from 'src/app/core/constants/api.constants';
import { selectClasses, selectDashboard, selectStudents, selectTeachers } from './selector';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { SafeToastService } from 'src/app/core/service/safe-toast.service';
import { TOASTER_MESSAGES } from 'src/app/core/constants/toaster_messages.constant';

@Injectable()
export class AdminEffects {
  private readonly actions$ = inject(Actions);
  private readonly apiService = inject(ApiService);
  private readonly store = inject(AdminService);
  private readonly router = inject(Router);
  private readonly toasterService = inject(SafeToastService);

  //#region Class effects
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
  createsClass$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(classAction.createClass),
      switchMap(({ Classes }) =>
        this.apiService.post<Class>(apiRoutes.class.create, Classes).pipe(
          map((Classes) => classAction.createClassSuccess({ Classes: Classes })),
          catchError((err) => of(classAction.createClassFailure({ error: err }))),
        ),
      ),
    );
  });

  createClassSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(classAction.createClassSuccess),
        tap(() => {
          this.toasterService.success(TOASTER_MESSAGES.SAVED_SUCCESS);
          this.router.navigate(['admin', 'classes']);
        }),
      );
    },
    { dispatch: false },
  );

  updateClass$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(classAction.updateClass),
      switchMap(({ Classes, id }) =>
        this.apiService.put<Class>(apiRoutes.class.update(id), Classes).pipe(
          map((Classes) => classAction.updateClassSuccess({ Classes: Classes })),
          catchError((err) => of(classAction.updateClassFailure({ error: err }))),
        ),
      ),
    );
  });

  updateClassSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(classAction.updateClassSuccess),
        tap(() => {
          this.router.navigate(['admin', 'classes']);
          this.toasterService.success(TOASTER_MESSAGES.UPDATED_SUCCESS);
        }),
      );
    },
    { dispatch: false },
  );

  deleteClass$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(classAction.deleteClass),
      switchMap(({ id }) =>
        this.apiService.delete<Class>(apiRoutes.class.delete(id)).pipe(
          map(() => classAction.deleteClassSuccess({ id })),
          catchError((err) => of(classAction.deleteClassFailure({ error: err }))),
        ),
      ),
    );
  });

  deleteClassSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(classAction.deleteClassSuccess),
        tap(() => {
          this.router.navigate(['admin', 'classes']);
          this.toasterService.success(TOASTER_MESSAGES.DELETED_SUCCESS);
        }),
      );
    },
    { dispatch: false },
  );
  //#endregion

  //#region teachers effects

  getAllTeachers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(teachersAction.getAllTeachers),
      withLatestFrom(this.store.select(selectTeachers)),
      filter(([_, teachers]) => !teachers?.length),
      switchMap(() =>
        this.apiService.get<TeacherProfile[]>(apiRoutes.teachers.get).pipe(
          map((teachers) => teachersAction.getAllTeachersSuccess({ teachers })),
          catchError((err) => of(teachersAction.getAllTeachersFailure({ error: err }))),
        ),
      ),
    );
  });
  createTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(teachersAction.createTeacher),
      switchMap(({ teacher }) =>
        this.apiService.post<TeacherProfile>(apiRoutes.teachers.create, teacher).pipe(
          map((teacher) => teachersAction.createTeacherSuccess({ teacher })),
          catchError((err) => of(teachersAction.createTeacherFailure({ error: err }))),
        ),
      ),
    );
  });

  createTeacherSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(teachersAction.createTeacherSuccess),
        tap(() => {
          this.toasterService.success(TOASTER_MESSAGES.SAVED_SUCCESS);
          this.router.navigate(['admin', 'teachers']);
        }),
      );
    },
    { dispatch: false },
  );
  updateTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(teachersAction.updateTeacher),
      switchMap(({ teacher, id }) =>
        this.apiService.put<TeacherProfile>(apiRoutes.teachers.update(id), teacher).pipe(
          map((teacher) => teachersAction.updateTeacherSuccess({ teacher })),
          catchError((err) => of(teachersAction.updateTeacherFailure({ error: err }))),
        ),
      ),
    );
  });
  updateTeacherSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(teachersAction.updateTeacherSuccess),
        tap(() => {
          this.toasterService.success(TOASTER_MESSAGES.UPDATED_SUCCESS);
          this.router.navigate(['admin', 'teachers']);
        }),
      );
    },
    { dispatch: false },
  );

  deleteTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(teachersAction.deleteTeacher),
      switchMap(({ id }) =>
        this.apiService.delete<TeacherProfile>(apiRoutes.teachers.delete(id)).pipe(
          map(() => teachersAction.deleteTeacherSuccess({ id })),
          catchError((err) => of(teachersAction.deleteTeacherFailure({ error: err }))),
        ),
      ),
    );
  });
  deleteTeacherSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(teachersAction.deleteTeacherSuccess),
        tap(() => {
          this.toasterService.success(TOASTER_MESSAGES.DELETED_SUCCESS);
        }),
      );
    },
    { dispatch: false },
  );
  //#endregion

  //#region school profile effects

  getDashboard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(schoolActions.getDashboard),
      withLatestFrom(this.store.select(selectDashboard)),
      filter(([_, dashboard]) => !dashboard),
      switchMap(() =>
        this.apiService.get<any>(apiRoutes.school.dashboard).pipe(
          map((dashboard) => schoolActions.getDashboardSuccess({ dashboard })),
          catchError((err) => of(schoolActions.getDashboardFailure({ error: err }))),
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
  updateSchoolProfileSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(schoolActions.updateSchoolSuccess),
        tap(() => {
          this.toasterService.success(TOASTER_MESSAGES.UPDATED_SUCCESS);
        }),
      );
    },
    { dispatch: false },
  );

  //#endregion
  //#region admin profile effects

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

  updateAdminProfileSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(adminActions.updateAdminSuccess),
        tap(() => {
          this.toasterService.success(TOASTER_MESSAGES.UPDATED_SUCCESS);
        }),
      );
    },
    { dispatch: false },
  );
  //#endregion
  //#region student effects

  getAllStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(studentAction.getAllStudents),
      withLatestFrom(this.store.select(selectStudents)),
      filter(([_, students]) => !students || !students.length),
      switchMap(() =>
        this.apiService.get<StudentProfile[]>(apiRoutes.students.get).pipe(
          map((student) => studentAction.getAllStudentsSuccess({ Students: student })),
          catchError((err) => of(studentAction.getAllStudentsFailure({ error: err }))),
        ),
      ),
    );
  });
  createsStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(studentAction.createStudents),
      switchMap(({ Students }) =>
        this.apiService.post<StudentProfile>(apiRoutes.students.create, Students).pipe(
          map((student) => studentAction.createStudentsSuccess({ Students: student })),
          catchError((err) => of(studentAction.createStudentsFailure({ error: err }))),
        ),
      ),
    );
  });

  createStudentSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(studentAction.createStudentsSuccess),
        tap(() => {
          this.toasterService.success(TOASTER_MESSAGES.SAVED_SUCCESS);
          this.router.navigate(['admin', 'students']);
        }),
      );
    },
    { dispatch: false },
  );

  updateStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(studentAction.updateStudents),
      switchMap(({ Students, id }) =>
        this.apiService.put<StudentProfile>(apiRoutes.students.update(id), Students).pipe(
          map((student) => studentAction.updateStudentsSuccess({ Students: student })),
          catchError((err) => of(studentAction.updateStudentsFailure({ error: err }))),
        ),
      ),
    );
  });

  updateStudentSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(studentAction.updateStudentsSuccess),
        tap(() => {
          this.router.navigate(['admin', 'students']);
          this.toasterService.success(TOASTER_MESSAGES.UPDATED_SUCCESS);
        }),
      );
    },
    { dispatch: false },
  );

  deleteStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(studentAction.deleteStudents),
      switchMap(({ id }) =>
        this.apiService.delete<StudentProfile>(apiRoutes.students.delete(id)).pipe(
          map(() => studentAction.deleteStudentsSuccess({ id })),
          catchError((err) => of(studentAction.deleteStudentsFailure({ error: err }))),
        ),
      ),
    );
  });

  deleteStudentSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(studentAction.deleteStudentsSuccess),
        tap(() => {
          this.router.navigate(['admin', 'students']);
          this.toasterService.success(TOASTER_MESSAGES.DELETED_SUCCESS);
        }),
      );
    },
    { dispatch: false },
  );
  //#endregion
}
