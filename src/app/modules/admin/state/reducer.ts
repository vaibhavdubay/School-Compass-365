import { createReducer } from '@ngrx/store';
import { AdminUser } from '@sc-models/core';

export interface AdminState {
  adminUser: AdminUser | null;
}

export const initialState: AdminState = {
  adminUser: null,
};

export const AdminReducer = createReducer(initialState);
