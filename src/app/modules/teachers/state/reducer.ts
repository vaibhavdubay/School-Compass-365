import { createReducer } from '@ngrx/store';
import { TeacherProfile, Nullable } from '@sc-models/core';

export interface TeachersState {
  teacherProfile: TeacherProfile;
}

export const initialState: Nullable<TeachersState> = {
  teacherProfile: null,
};

export const TeachersReducer = createReducer(initialState);
