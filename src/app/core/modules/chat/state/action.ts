import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Chat, HttpErrorObject } from '@sc-models/core';

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
