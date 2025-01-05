import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { AdminUser, Class, HttpErrorObject, SchoolProfile, TeacherProfile } from '@sc-models/core';

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
  },
});