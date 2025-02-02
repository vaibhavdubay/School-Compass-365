import { createReducer, on } from '@ngrx/store';
import { Class, Nullable } from '@sc-models/core';
import { adminActions, initAdminState, classes as classAction, school as schoolAction, teachersAction } from './action';
import { SchoolProfile } from '@sc-models/school';
import { AdminUser } from '@sc-models/admin';
import { TeacherProfile } from '@sc-models/teacher';

export interface AdminState {
  adminUser: AdminUser;
  schoolProfile: SchoolProfile;
  dashboard: any;
  classes: Class[];
  teachers: TeacherProfile[]
}

export const initialState: Nullable<AdminState> = {
  adminUser: null,
  schoolProfile: null,
  dashboard: null,
  classes: [],
  teachers: []
};

export const AdminReducer = createReducer<AdminState>(
  initialState as AdminState,
  on(initAdminState, (state, action) => ({
    ...state,
    adminUser: action.adminProfile,
  })),
  on(classAction.getAllSuccess, (state, action) => ({
    ...state,
    classes: action.classes,
  })),
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
    teachers: state.teachers.map((teacher)=> teacher.id == action.teacher.id ? action.teacher : teacher),
  })),
  on(teachersAction.deleteTeacherSuccess, (state, action) => ({
    ...state,
    teachers: state.teachers.filter((teacher)=> teacher.id !== action.id),
  })),
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
  on(adminActions.updateAdminSuccess, (state, action) => {
    const adminUser = JSON.parse(JSON.stringify(action.adminUser))
    delete adminUser['school']
    delete adminUser['user']
    return {
      ...state,
      adminUser: adminUser,
    };
  }),
);
