import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { AdminUser, Class, TeacherProfileDTO, HttpErrorObject, SchoolProfile, TeacherProfile } from '@sc-models/core';

export const initAdminState = createAction('[ADMIN] Initiate State', props<{ adminProfile: AdminUser }>());

export const classes = createActionGroup({
  source: 'Classes',
  events: {
    'Get All': emptyProps(),
    'Get All Success': props<{ classes: Class[] }>(),
    'Get All Failure': props<{ error: HttpErrorObject }>(),
  },
});

export const school = createActionGroup({
  source: 'School',
  events: {
    'Update School': props<{ school: Partial<SchoolProfile & { image?: File }> }>(),
    'Update School Success': props<{ school: SchoolProfile }>(),
    'Update School Failure': props<{ error: HttpErrorObject }>(),
  },
});

export const teachersAction = createActionGroup({
  source: 'Teachers',
  events: {
    'Get All Teachers': emptyProps(),
    'Get All TeachersSuccess': props<{ teachers: TeacherProfile[] }>(),
    'Get All TeachersFailure': props<{ error: HttpErrorObject }>(),
    'Create Teacher': props<{ teacher: TeacherProfileDTO }>(),
    'Create TeacherSuccess': props<{ teacher: TeacherProfile }>(),
    'Create TeacherFailure': props<{ error: HttpErrorObject }>(),
    'Update Teacher': props<{ teacher: TeacherProfileDTO; id: string }>(),
    'Update TeacherSuccess': props<{ teacher: TeacherProfile }>(),
    'Update TeacherFailure': props<{ error: HttpErrorObject }>(),
    'Delete Teacher': props<{ id: string }>(),
    'Delete TeacherSuccess': props<{ id: string }>(),
    'Delete TeacherFailure': props<{ error: HttpErrorObject }>(),
  },
});

export const adminActions = createActionGroup({
  source: 'Admin',
  events: {
    'Update Admin': props<{ adminUser: Partial<AdminUser & { image?: File }> }>(),
    'Update Admin Success': props<{ adminUser: AdminUser }>(),
    'Update Admin Failure': props<{ error: HttpErrorObject }>(),
  },
});
