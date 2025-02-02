import { createReducer } from '@ngrx/store';
import { Nullable } from '@sc-models/core';
import { TeacherProfile } from '@sc-models/teacher';

export interface TeachersState {
  teacherProfile: TeacherProfile;
}

export const initialState: Nullable<TeachersState> = {
  teacherProfile: null,
};

export const TeachersReducer = createReducer(initialState);
