import { User } from "./core.model";

export enum CHAT_ROOM_TYPE {
  PUBLIC = 'public',
  PRIVATE = 'private',
  PROTECTED = 'protected',
}

export enum CHAT_ROOM_INVITATION_STATUS {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export enum CHAT_ROLE {
  ADMIN = 'admin',
  MEMBER = 'member',
  GUEST = 'guest',
}

export interface ChatBase {
  id: string;
  sender: User;
  room?: any;
  recipient?: User;
  content: string;
  status: 'sending' | 'failed';
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatRead extends ChatBase {
  isRead: true;
  readAt: Date;
}

export interface ChatUnread extends ChatBase {
  isRead: false;
}

// Final type that combines all possible cases
export type Chat = ChatRead | ChatUnread;

export type ChatDto = Omit<Chat, 'createdAt' | 'updatedAt'>;

export interface ChatRoom {
  id: string;
  name: string;
  roomType: CHAT_ROOM_TYPE;
  isActive: boolean;
  members: ChatRoomMember[];
  chats: Chat[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatRoomMember {
  id: string;
  user: User;
  role: CHAT_ROLE;
  isActive: boolean;
  isMuted: boolean;
  isArchived: boolean;
  invitationStatus: CHAT_ROOM_INVITATION_STATUS;
  createdAt: Date;
  updatedAt: Date;
}
