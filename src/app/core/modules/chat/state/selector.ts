import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatStoreState } from './reducer';
import { STORE_FEATURES } from '@sc-enums/store';

const selectChatState = createFeatureSelector<ChatStoreState>(STORE_FEATURES.CHAT);

export const selectChatList = createSelector(selectChatState, (state) => state.chatList);
export const selectCurrentThreadId = createSelector(selectChatState, (state) => state.threadId);
export const selectCurrentThreadType = createSelector(selectChatState, (state) => state.threadType);

export const selectChats = createSelector(selectChatState, (state) =>
  state.threadId
    ? state.chats[state.threadType][state.threadId] ||
      state.chatList.filter((chat) => chat.sender.id === state.threadId || chat.recipient?.id === state.threadId || chat.room?.id === state.threadId)
    : [],
);
