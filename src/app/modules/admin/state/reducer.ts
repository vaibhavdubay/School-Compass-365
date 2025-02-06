import { createReducer, on } from '@ngrx/store';
import { AdminUser, Class, Nullable, SchoolProfile, ShiftRes, StudentProfile, TeacherProfile } from '@sc-models/core';
import { adminActions, initAdminState, teachersAction, studentAction, ShiftAction } from './action';
import { classes as classAction, school as schoolAction } from './action';

export interface AdminState {
  adminUser: AdminUser;
  schoolProfile: SchoolProfile;
  dashboard: any;
  classes: Class[];
  teachers: TeacherProfile[];
  students: StudentProfile[];
  shift: ShiftRes[];
}

export const initialState: Nullable<AdminState> = {
  adminUser: null,
  schoolProfile: null,
  dashboard: null,
  classes: [],
  teachers: [],
  students: [],
  shift: [],
};

export const AdminReducer = createReducer<AdminState>(
  initialState as AdminState,
  on(initAdminState, (state, action) => ({
    ...state,
    adminUser: action.adminProfile,
  })),
  //#region Class
  on(classAction.getAllSuccess, (state, action) => ({
    ...state,
    classes: action.classes,
  })),
  on(classAction.createClassSuccess, (state, action) => ({
    ...state,
    classes: [...state.classes, action.Classes],
  })),
  on(classAction.updateClassSuccess, (state, action) => ({
    ...state,
    classes: state.classes.map((cl) => (cl.id == action.Classes.id ? action.Classes : cl)),
  })),
  on(classAction.deleteClassSuccess, (state, action) => ({
    ...state,
    classes: state.classes.filter((cl) => cl.id !== action.id),
  })),
  //#endregion
  //#region Teacher
  on(teachersAction.getAllTeachersSuccess, (state, action) => ({
    ...state,
    teachers: action.teachers,
  })),
  on(teachersAction.createTeacherSuccess, (state, action) => ({
    ...state,
    teachers: [...state.teachers, action.teacher],
  })),
  on(teachersAction.updateTeacherSuccess, (state, action) => ({
    ...state,
    teachers: state.teachers.map((teacher) => (teacher.id == action.teacher.id ? action.teacher : teacher)),
  })),
  on(teachersAction.deleteTeacherSuccess, (state, action) => ({
    ...state,
    teachers: state.teachers.filter((teacher) => teacher.id !== action.id),
  })),
  //#endregion
  //#region Student
  on(studentAction.getAllStudentsSuccess, (state, action) => ({
    ...state,
    students: action.Students,
  })),
  on(studentAction.createStudentsSuccess, (state, action) => ({
    ...state,
    students: [...state.students, action.Students],
  })),
  on(studentAction.updateStudentsSuccess, (state, action) => ({
    ...state,
    students: state.students.map((student) => (student.id == action.Students.id ? action.Students : student)),
  })),
  on(studentAction.deleteStudentsSuccess, (state, action) => ({
    ...state,
    students: state.students.filter((student) => student.id !== action.id),
  })),
  //#region Shift
  on(ShiftAction.getAllShiftSuccess, (state, action) => ({
    ...state,
    shift: action.Shift,
  })),
  on(ShiftAction.createShiftSuccess, (state, action) => ({
    ...state,
    shift: [...state.shift, action.Shift],
  })),
  on(ShiftAction.updateShiftSuccess, (state, action) => ({
    ...state,
    shift: state.shift.map((shift) => (shift.id == action.Shift.id ? action.Shift : shift)),
  })),
  on(ShiftAction.deleteShiftSuccess, (state, action) => ({
    ...state,
    shift: state.shift.filter((shift) => shift.id !== action.id),
  })),
  //#endregion
  //#region School
  on(schoolAction.getDashboardSuccess, (state, action) => ({
    ...state,
    dashboard: action.dashboard,
  })),
  on(schoolAction.updateSchoolSuccess, (state, action) => {
    return {
      ...state,
      schoolProfile: action.school,
    };
  }),
  //#endregion
  //#region Admin
  on(adminActions.updateAdminSuccess, (state, action) => {
    const adminUser = JSON.parse(JSON.stringify(action.adminUser));
    delete adminUser['school'];
    delete adminUser['user'];
    return {
      ...state,
      adminUser: adminUser,
    };
  }),
);
