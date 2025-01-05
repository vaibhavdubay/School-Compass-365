import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Address, HttpErrorObject, LoggedInUser, LoginDto, LoginResponse, User } from '@sc-models/core';

export const logInActions = createActionGroup({
  source: 'Authentication',
  events: {
    'User Profile': emptyProps(),
    'User Profile Success': props<{ response: LoggedInUser }>(),
    'User Profile Failure': props<{ error: HttpErrorObject }>(),
    'Log In': props<{ logDto: LoginDto }>(),
    'Log In Success': props<{ response: LoginResponse }>(),
    'Log In Failure': emptyProps(),
    'Log Out': emptyProps(),
  },
});

export const addressActions = createActionGroup({
  source: 'Address',
  events: {
    'Load States': emptyProps(),
    'Load States Success': props<{ states: string[] }>(),
    'Load States Failure': props<{ error: string }>(),
    'Load Districts': props<{ state: string }>(),
    'Load Districts Success': props<{ state: string; districts: string[] }>(),
    'Load Districts Failure': props<{ error: string }>(),
    'Load Pincodes': props<{
      state: string;
      district: string;
    }>(),
    'Load Pincodes Success': props<{
      state: string;
      district: string;
      addresses: Address[];
    }>(),
    'Load Pincodes Failure': props<{ error: string }>(),
  },
});

export const userActions = createActionGroup({
  source: "Users",
  events: {
    'Update User': props<{ user: Partial<User> }>(),
    'Update User Success': props<{ user: User }>(),
    'Update User Failure': props<{ error: HttpErrorObject }>(),
  }
})
