import { createReducer, on } from '@ngrx/store';
import { Class, Nullable } from '@sc-models/core';
import { adminActions, initAdminState, classes as classAction, school as schoolAction } from './action';
import { SchoolProfile } from '@sc-models/school';
import { AdminUser } from '@sc-models/admin';

export interface AdminState {
  adminUser: AdminUser;
  classes: Class[];
  schoolProfile: SchoolProfile;
}

export const initialState: Nullable<AdminState> = {
  adminUser: null,
  classes: null,
  schoolProfile: null,
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
