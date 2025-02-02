import { createReducer } from '@ngrx/store';
import { Nullable } from '@sc-models/core';
import { StudentProfile } from '@sc-models/student';

export interface StudentState {
  studentProfile: StudentProfile;
}

export const initialState: Nullable<StudentState> = {
  studentProfile: null,
};

export const StudentReducer = createReducer(initialState);
