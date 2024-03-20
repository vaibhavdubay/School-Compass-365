import { createFeatureSelector, createSelector } from '@ngrx/store';
import { STORE_FEATURES } from '@sc-enums/store';
import { SharedState } from './reducer';

const selectSharedState = createFeatureSelector<SharedState>(
  STORE_FEATURES.SHARED,
);

export const selectLoggedInUser = createSelector(
  selectSharedState,
  (state) => state.loggedInUser,
);

export const selectSchoolProfile = createSelector(
  selectLoggedInUser,
  (state) => state.school,
);
