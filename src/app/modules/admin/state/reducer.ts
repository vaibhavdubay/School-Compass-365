import { createReducer } from '@ngrx/store';
import { AdminUser, Nullable } from '@sc-models/core';

export interface AdminState {
  adminUser: AdminUser;
}

export const initialState: Nullable<AdminState> = {
  adminUser: null,
};

export const AdminReducer = createReducer(initialState);
