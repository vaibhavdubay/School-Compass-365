import { createFeatureSelector, createSelector } from '@ngrx/store';
import { STORE_FEATURES } from '@sc-enums/store';
import { StudentState } from './reducer';

const selectAdminState = createFeatureSelector<StudentState>(
  STORE_FEATURES.STUDENT,
);

export const selectStudentProfile = createSelector(
  selectAdminState,
  (state) => state.studentProfile,
);
