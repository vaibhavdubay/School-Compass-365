import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ChatStoreState } from "./reducer";
import { STORE_FEATURES } from "@sc-enums/store";

const selectChatState = createFeatureSelector<ChatStoreState>(STORE_FEATURES.CHAT);

export const selectChatList = createSelector(selectChatState, (state) => state.chatList);
export const selectCurrentChat = createSelector(selectChatState, (state) => state.selectedChat);
