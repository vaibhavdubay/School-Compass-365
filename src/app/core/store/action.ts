import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Role } from '@sc-enums/role';
import {
  HttpErrorObject,
  LoggedInUser,
  LoginDto,
  LoginResponse,
} from '@sc-models/core';

export const logInActions = createActionGroup({
  source: 'Authentication',
  events: {
    'User Profile': emptyProps(),
    'User Profile Success': props<{ response: LoggedInUser }>(),
    'User Profile Failure': props<{ error: HttpErrorObject }>(),
    'Log In': props<{ role: Role; logDto: LoginDto }>(),
    'Log In Success': props<{ response: LoginResponse }>(),
    'Log In Failure': emptyProps(),
  },
});
