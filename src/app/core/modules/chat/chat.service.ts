import { inject, Injectable } from '@angular/core';
import { StoreService } from '../../service/store.service';
import { ChatStoreState } from './state/reducer';
import { Store } from '@ngrx/store';
import { chatsAction } from './state/action';
import { selectChatList, selectChats } from './state/selector';
import { Chat, ChatDto } from '@sc-models/chat';

@Injectable({
  providedIn: 'root',
})
export class ChatStoreService extends StoreService<ChatStoreState> {
  constructor() {
    const store = inject(Store);

    super(store);
  }

  get chatList$() {
    this.dispatch(chatsAction.getMessageList());
    return this.select(selectChatList);
  }

  get chats$() {
    return this.select(selectChats);
  }

  selectChat(chat: Chat, threadId: string) {
    this.dispatch(chatsAction.selectChat({ chat, threadId }));
    this.getChatMessages();
    this.markAsRead();
    return this.select(selectChats);
  }

  sendChatMessage(chat: ChatDto) {
    this.dispatch(chatsAction.sendMessage({ chat }));
  }

  getChatMessages() {
    this.dispatch(chatsAction.getMessages());
  }

  markAsRead() {
    this.dispatch(chatsAction.markMessageAsRead());
  }

  deleteMessage(messageId: string) {
    this.dispatch(chatsAction.deleteMessage({ messageId }));
  }

  editMessage(messageId: string, newMessage: Chat) {
    this.dispatch(chatsAction.editMessage({ messageId, newMessage }));
  }
}
