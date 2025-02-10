import { createReducer, on } from '@ngrx/store';
import { chatsAction } from './action';
import { Chat } from '@sc-models/chat';
import { Nullable } from '@sc-models/core';

enum ThreadType {
  Chat = 'chat',
  Room = 'room',
}

export interface ChatStoreState {
  fetchingChatList: boolean;
  fetchingChats: boolean;
  chatList: Chat[];
  threadId: string;
  threadType: ThreadType;
  chats: { [k in ThreadType]: { [threadId: string]: Chat[] } };
}

export const initialState: Nullable<ChatStoreState> = {
  fetchingChatList: false,
  fetchingChats: false,
  threadId: null,
  threadType: null,
  chatList: [],
  chats: { room: {}, chat: {} },
};

export const ChatStoreReducer = createReducer(
  initialState as ChatStoreState,

  // #region Select Chat
  on(chatsAction.selectChat, (state, action) => ({
    ...state,
    threadId: action.threadId,
    threadType: action.chat.room ? ThreadType.Room : ThreadType.Chat,
  })),
  // #endregion

  // #region Get Messages List
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
  // #endregion

  // #region Get Message
  on(chatsAction.getMessages, (state) => ({
    ...state,
    fetchingChats: true,
  })),
  on(chatsAction.getMessagesSuccess, (state, action) => ({
    ...state,
    chats: {
      ...state.chats,
      [action.threadType]: {
        ...state.chats[action.threadType],
        ...{ [action.threadId]: action.chats },
      },
    },
    fetchingChats: false,
  })),
  on(chatsAction.getMessagesFailure, (state) => ({
    ...state,
    fetchingChats: false,
  })),
  // #endregion

  // #region Message Receive Success

  on(chatsAction.messageReceiveSuccess, (state, action) => ({
    ...state,
    chats: {
      ...state.chats,
      [action.threadType]: {
        ...state.chats[action.threadType],
        ...{
          [action.threadId]: [action.chat, ...(state.chats[action.threadType][action.threadId] ?? [])],
        },
      },
    },
  })),

  // #endregion

  // #region Send Message
  on(chatsAction.sendMessage, (state, action) => ({
    ...state,
    chats: {
      ...state.chats,
      [state.threadType]: {
        ...state.chats[state.threadType],
        ...{
          [state.threadId]: [
            action.chat,
            ...(state.chats[state.threadType][state.threadId] ? state.chats[state.threadType][state.threadId] : []),
          ],
        },
      },
    },
  })),
  on(chatsAction.sendMessageSuccess, (state, action) => ({
    ...state,
    chats: {
      ...state.chats,
      [action.chat.recipient ? 'chat' : 'room']: {
        ...state.chats[action.chat.recipient ? 'chat' : 'room'],
        ...{
          [action.chat.recipient?.id ?? action.chat.room?.id]: state.chats[action.chat.recipient ? 'chat' : 'room'][
            action.chat.recipient?.id ?? action.chat.room?.id
          ].map((chat) => (chat.id === action.chat.id ? action.chat : chat)),
        },
      },
    },
  })),
  on(chatsAction.sendMessageFailure, (state, action) => ({
    ...state,
    chats: {
      ...state.chats,
      [action.chat.recipient ? 'chat' : 'room']: {
        ...state.chats[action.chat.recipient ? 'chat' : 'room'],
        ...{
          [action.chat.recipient?.id ?? action.chat.room?.id]: state.chats[action.chat.recipient ? 'chat' : 'room'][
            action.chat.recipient?.id ?? action.chat.room?.id
          ].map((chat) => (chat.status === action.chat.status ? { ...action.chat, status: 'failed' } : chat)),
        },
      },
    },
  })),
  // #endregion

  // #region Delete Message
  on(chatsAction.deleteMessage, (state) => ({
    ...state,
  })),
  on(chatsAction.deleteMessageSuccess, (state, action) => ({
    ...state,
    chats: {
      ...state.chats,
      [action.threadType]: {
        ...state.chats[action.threadType],
        ...{
          [action.threadId]: state.chats[action.threadType][action.threadId].filter(
            (chat) => chat.id !== action.messageId,
          ),
        },
      },
    },
  })),
  on(chatsAction.deleteMessageFailure, (state) => ({
    ...state,
  })),
  // #endregion

  // #region Edit Message
  on(chatsAction.editMessage, (state) => ({
    ...state,
  })),
  on(chatsAction.editMessageSuccess, (state, action) => ({
    ...state,
    chats: {
      ...state.chats,
      [action.threadType]: {
        ...state.chats[action.threadType],
        ...{
          [action.threadId]: state.chats[action.threadType][action.threadId].map((chat) =>
            chat.id === action.newMessage.id ? { ...chat, ...action.newMessage } : chat,
          ),
        },
      },
    },
  })),
  on(chatsAction.editMessageFailure, (state) => ({
    ...state,
  })),
  // #endregion

  // #region Mark Message as Read
  on(chatsAction.markMessageAsRead, (state) => ({
    ...state,
  })),
  on(chatsAction.markMessageAsReadSuccess, (state, action) => ({
    ...state,
    chats: {
      ...state.chats,
      [action.threadType]: {
        ...{
          [action.threadId]: state.chats[action.threadType][action.threadId].map((chat) => ({
            ...chat,
            isRead: true,
            readAt: new Date(),
          })),
        },
      },
    },
  })),
  on(chatsAction.markMessageAsReadFailure, (state) => ({
    ...state,
  })),
  // #endregion
);
