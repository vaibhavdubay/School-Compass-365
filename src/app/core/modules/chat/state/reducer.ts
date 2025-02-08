import { createReducer, on } from '@ngrx/store';
import { Chat, Nullable } from '@sc-models/core';
import { chatsAction } from './action';

export interface ChatStoreState {
  fetchingChatList: boolean;
  chatList: Chat[];
  selectedChat: string;
  chats: { [user: string]: Chat[] };
}

export const initialState: Nullable<ChatStoreState> = {
  fetchingChatList: false,
  selectedChat: null,
  chatList: [],
  chats: {},
};

export const ChatStoreReducer = createReducer(
  initialState,

  on(chatsAction.getMessageList, (state) => ({
    ...state,
    fetchingChatList: true,
  })),
  on(chatsAction.getMessageListSuccess, (state, action) => ({
    ...state,
    chatList: action.chats,
    fetchingChatList: false,
  })),
  on(chatsAction.getMessageListFailure, (state) => ({
    ...state,
    fetchingChatList: false,
  })),
);
