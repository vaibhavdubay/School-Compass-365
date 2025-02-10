import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Chat, ChatDto } from '@sc-models/chat';
import { HttpErrorObject } from '@sc-models/core';

export const chatsAction = createActionGroup({
  source: 'chats',
  events: {
    'Select Chat': props<{ chat: Chat, threadId: string }>(),

    'Send Message': props<{ chat: ChatDto }>(),
    'Send Message Success': props<{ chat: Chat }>(),
    'Send Message Failure': props<{ chat: ChatDto; error: HttpErrorObject }>(),

    'Get Message List': emptyProps(),
    'Get Message List Success': props<{ chats: Chat[] }>(),
    'Get Message List Failure': props<{ error: HttpErrorObject }>(),

    'Get Messages': emptyProps(),
    'Get Messages Success': props<{ chats: Chat[]; threadType: 'chat' | 'room'; threadId: string }>(),
    'Get Messages Failure': props<{ error: HttpErrorObject }>(),

    'Message Receive Success': props<{ chat: Chat; threadType: 'chat' | 'room'; threadId: string }>(),

    'Delete Message': props<{ messageId: string }>(),
    'Delete Message Success': props<{ threadId: string; threadType: 'chat' | 'room'; messageId: string }>(),
    'Delete Message Failure': props<{ error: HttpErrorObject }>(),

    'Edit Message': props<{ messageId: string; newMessage: Chat }>(),
    'Edit Message Success': props<{
      threadId: string;
      threadType: 'chat' | 'room';
      messageId: string;
      newMessage: Chat;
    }>(),
    'Edit Message Failure': props<{ error: HttpErrorObject }>(),

    'Mark Message As Read': emptyProps(),
    'Mark Message As Read Success': props<{ threadId: string; threadType: 'chat' | 'room' }>(),
    'Mark Message As Read Failure': props<{ error: HttpErrorObject }>(),

    'Start Conversation': emptyProps(),
    'Start Conversation Success': emptyProps(),
    'Start Conversation Failure': props<{ error: HttpErrorObject }>(),

    'End Conversation': emptyProps(),
    'End Conversation Success': emptyProps(),
  },
});
