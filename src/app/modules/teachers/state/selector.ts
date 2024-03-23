import { createFeatureSelector, createSelector } from '@ngrx/store';
import { STORE_FEATURES } from '@sc-enums/store';
import { TeachersState } from './reducer';

const selectTeachersState = createFeatureSelector<TeachersState>(
  STORE_FEATURES.TEACHER,
);

export const selectTeacherProfile = createSelector(
  selectTeachersState,
  (state) => state.teacherProfile,
);
