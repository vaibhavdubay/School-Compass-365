import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Role } from '@sc-enums/role';
import { LoginDto, LoginResponse } from '@sc-models/core';

export const logInActions = createActionGroup({
  source: 'Authentication',
  events: {
    'Log In': props<{ role: Role; logDto: LoginDto }>(),
    'Log In Success': props<{ response: LoginResponse }>(),
    'Log In Failure': emptyProps(),
  },
});
