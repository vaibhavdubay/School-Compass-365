import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, withLatestFrom } from 'rxjs';
import { apiRoutes } from 'src/app/core/constants/api.constants';
import { ApiService } from 'src/app/core/service/http.service';
import { chatsAction } from './action';
import { Chat } from '@sc-models/chat';
import { WebSocketService } from 'src/app/core/service/web-socket.service';
import { selectCurrentThreadId, selectCurrentThreadType } from './selector';

@Injectable()
export class ChatStoreEffect {
  private readonly action$ = inject(Actions);
  private readonly apiService = inject(ApiService);
  private readonly webSocketService = inject(WebSocketService);
  private readonly store = inject(Store);

  getMessageList$ = createEffect(() => {
    return this.action$.pipe(
      ofType(chatsAction.getMessageList),
      switchMap(() =>
        this.apiService.get<Chat[]>(apiRoutes.chat.getList).pipe(
          map((chats) => chatsAction.getMessageListSuccess({ chats })),
          catchError((err) => of(chatsAction.getMessageListFailure({ error: err }))),
        ),
      ),
    );
  });

  getChatList$ = createEffect(() => {
    return this.action$.pipe(
      ofType(chatsAction.getMessages),
      withLatestFrom(this.store.select(selectCurrentThreadId), this.store.select(selectCurrentThreadType)),
      switchMap(([_, threadId, threadType]) =>
        this.apiService.get<Chat[]>(apiRoutes.chat.getChats(threadId)).pipe(
          map((chats) => chatsAction.getMessagesSuccess({ chats, threadId, threadType })),
          catchError((err) => of(chatsAction.getMessagesFailure({ error: err }))),
        ),
      ),
    );
  });

  markAsRead$ = createEffect(() => {
    return this.action$.pipe(
      ofType(chatsAction.markMessageAsRead),
      withLatestFrom(this.store.select(selectCurrentThreadId), this.store.select(selectCurrentThreadType)),
      switchMap(([_, threadId, threadType]) =>
        this.apiService.get(apiRoutes.chat.markAsRead(threadId)).pipe(
          map(() => chatsAction.markMessageAsReadSuccess({ threadId, threadType })),
          catchError((err) => of(chatsAction.markMessageAsReadFailure({ error: err }))),
        ),
      ),
    );
  });

  updateChat$ = createEffect(() => {
    return this.action$.pipe(
      ofType(chatsAction.editMessage),
      withLatestFrom(this.store.select(selectCurrentThreadId), this.store.select(selectCurrentThreadType)),
      switchMap(([{ messageId, newMessage }, threadId, threadType]) =>
        this.apiService.put<Chat>(apiRoutes.chat.update(messageId), newMessage).pipe(
          map((chat) => chatsAction.editMessageSuccess({ threadId, threadType, messageId, newMessage: chat })),
          catchError((err) => of(chatsAction.editMessageFailure({ error: err }))),
        ),
      ),
    );
  });

  deleteChat$ = createEffect(() => {
    return this.action$.pipe(
      ofType(chatsAction.deleteMessage),
      withLatestFrom(this.store.select(selectCurrentThreadId), this.store.select(selectCurrentThreadType)),
      switchMap(([{ messageId }, threadId, threadType]) =>
        this.apiService.delete(apiRoutes.chat.delete(messageId)).pipe(
          map(() => chatsAction.deleteMessageSuccess({ threadId, threadType, messageId })),
          catchError((err) => of(chatsAction.deleteMessageFailure({ error: err }))),
        ),
      ),
    );
  });

  privateMessage$ = createEffect(() => {
    return this.webSocketService
      .socketEvent('privateMessage')
      .pipe(
        switchMap((message) =>
          of(chatsAction.messageReceiveSuccess({ chat: message, threadId: message.sender.id, threadType: 'chat' })),
        ),
      );
  });

  sendMessage$ = createEffect(() => {
    return this.action$.pipe(
      ofType(chatsAction.sendMessage),
      withLatestFrom(this.store.select(selectCurrentThreadId)),
      switchMap(([{ chat }, threadId]) =>
        this.webSocketService
          .emitSocketEvent('privateMessage', { to: threadId, chat: { ...chat, id: undefined } })
          .pipe(
            map((res) => chatsAction.sendMessageSuccess({ chat: { ...res, id: chat.id, } })),
            catchError((err) => of(chatsAction.sendMessageFailure({ chat: chat, error: err }))),
          ),
      ),
    );
  });
}
