import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { ShiftRes, ShiftDTO } from '@sc-models/classes';
import {
  AdminUser,
  Class,
  TeacherProfileDTO,
  HttpErrorObject,
  SchoolProfile,
  TeacherProfile,
  StudentProfile,
  StudentProfileDTO,
  classDTO,
} from '@sc-models/core';

export const initAdminState = createAction('[ADMIN] Initiate State', props<{ adminProfile: AdminUser }>());

export const classes = createActionGroup({
  source: 'Classes',
  events: {
    'Get All': emptyProps(),
    'Get All Success': props<{ classes: Class[] }>(),
    'Get All Failure': props<{ error: HttpErrorObject }>(),
    'Create Class': props<{ Classes: classDTO }>(),
    'Create ClassSuccess': props<{ Classes: Class }>(),
    'Create ClassFailure': props<{ error: HttpErrorObject }>(),
    'Update Class': props<{ Classes: classDTO; id: string }>(),
    'Update ClassSuccess': props<{ Classes: Class }>(),
    'Update ClassFailure': props<{ error: HttpErrorObject }>(),
    'Delete Class': props<{ id: string }>(),
    'Delete ClassSuccess': props<{ id: string }>(),
    'Delete ClassFailure': props<{ error: HttpErrorObject }>(),
  },
});

export const school = createActionGroup({
  source: 'School',
  events: {
    'Update School': props<{ school: Partial<SchoolProfile & { image?: File }> }>(),
    'Update School Success': props<{ school: SchoolProfile }>(),
    'Update School Failure': props<{ error: HttpErrorObject }>(),
    'Get Dashboard': emptyProps(),
    'Get Dashboard Success': props<{ dashboard: any }>(),
    'Get Dashboard Failure': props<{ error: HttpErrorObject }>(),
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
export const studentAction = createActionGroup({
  source: 'Students',
  events: {
    'Get All Students': emptyProps(),
    'Get All StudentsSuccess': props<{ Students: StudentProfile[] }>(),
    'Get All StudentsFailure': props<{ error: HttpErrorObject }>(),
    'Create Students': props<{ Students: StudentProfileDTO }>(),
    'Create StudentsSuccess': props<{ Students: StudentProfile }>(),
    'Create StudentsFailure': props<{ error: HttpErrorObject }>(),
    'Update Students': props<{ Students: StudentProfileDTO; id: string }>(),
    'Update StudentsSuccess': props<{ Students: StudentProfile }>(),
    'Update StudentsFailure': props<{ error: HttpErrorObject }>(),
    'Delete Students': props<{ id: string }>(),
    'Delete StudentsSuccess': props<{ id: string }>(),
    'Delete StudentsFailure': props<{ error: HttpErrorObject }>(),
  },
});
export const ShiftAction = createActionGroup({
  source: 'Shift',
  events: {
    'Get All Shift': emptyProps(),
    'Get All ShiftSuccess': props<{ Shift: ShiftRes[] }>(),
    'Get All ShiftFailure': props<{ error: HttpErrorObject }>(),
    'Create Shift': props<{ Shift: ShiftDTO }>(),
    'Create ShiftSuccess': props<{ Shift: ShiftRes }>(),
    'Create ShiftFailure': props<{ error: HttpErrorObject }>(),
    'Update Shift': props<{ Shift: ShiftDTO; id: string }>(),
    'Update ShiftSuccess': props<{ Shift: ShiftRes }>(),
    'Update ShiftFailure': props<{ error: HttpErrorObject }>(),
    'Delete Shift': props<{ id: string }>(),
    'Delete ShiftSuccess': props<{ id: string }>(),
    'Delete ShiftFailure': props<{ error: HttpErrorObject }>(),
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
