import { createReducer, on } from '@ngrx/store';
import { LoggedInUser, Nullable } from '@sc-models/core';
import { logInActions } from './action';

export interface SharedState {
  loggedInUser: LoggedInUser;
}

export const initialState: Nullable<SharedState> = {
  loggedInUser: null,
};

export const SharedStoreReducer = createReducer(
  initialState,
  on(
    logInActions.logInSuccess,
    (state, action): SharedState => ({
      ...state,
      loggedInUser: action.response.user,
    }),
  ),
);
