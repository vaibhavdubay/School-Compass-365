import { createReducer, on } from '@ngrx/store';
import { AdminUser, Class, Nullable, SchoolProfile, TeacherProfile } from '@sc-models/core';
import { adminActions, initAdminState, teachersAction } from './action';
import { classes as classAction, school as schoolAction } from './action';

export interface AdminState {
  adminUser: AdminUser;
  schoolProfile: SchoolProfile;
  classes: Class[];
  teachers: TeacherProfile[]
}

export const initialState: Nullable<AdminState> = {
  adminUser: null,
  schoolProfile: null,
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
