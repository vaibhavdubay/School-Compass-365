import { createReducer } from '@ngrx/store';
import { StudentProfile, Nullable } from '@sc-models/core';

export interface StudentState {
  studentProfile: StudentProfile;
}

export const initialState: Nullable<StudentState> = {
  studentProfile: null,
};

export const StudentReducer = createReducer(initialState);
