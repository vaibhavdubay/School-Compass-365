import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Address, Chat, HttpErrorObject, LoggedInUser, LoginDto, LoginResponse, User } from '@sc-models/core';

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
  source: 'Users',
  events: {
    'Update User': props<{ user: Partial<User> }>(),
    'Update User Success': props<{ user: User }>(),
    'Update User Failure': props<{ error: HttpErrorObject }>(),
  },
});

export const chatsAction = createActionGroup({
  source: 'chats',
  events: {
    'Send Message': props<{ chat: Chat }>(),
    'Send Message Success': props<{ chat: Chat }>(),
    'Send Message Failure': props<{ error: HttpErrorObject }>(),
    'Get Message List': emptyProps(),
    'Get Message List Success': props<{ chats: Chat[] }>(),
    'Get Message List Failure': props<{ error: HttpErrorObject }>(),
    'Get Messages': emptyProps(),
    'Get Messages Success': props<{ chats: Chat[] }>(),
    'Get Messages Failure': props<{ error: HttpErrorObject }>(),
    'Delete Message': props<{ messageId: string }>(),
    'Delete Message Success': emptyProps(),
    'Delete Message Failure': props<{ error: HttpErrorObject }>(),
    'Edit Message': props<{ messageId: string; newMessage: Chat }>(),
    'Edit Message Success': emptyProps(),
    'Edit Message Failure': props<{ error: HttpErrorObject }>(),
    'Mark Message As Read': props<{ messageId: string }>(),
    'Mark Message As Read Success': emptyProps(),
    'Mark Message As Read Failure': props<{ error: HttpErrorObject }>(),
    'Start Conversation': emptyProps(),
    'Start Conversation Success': emptyProps(),
    'Start Conversation Failure': props<{ error: HttpErrorObject }>(),
    'End Conversation': emptyProps(),
    'End Conversation Success': emptyProps(),
  },
});
