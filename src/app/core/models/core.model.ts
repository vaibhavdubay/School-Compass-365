import { HttpHeaders, HttpContext, HttpParams } from '@angular/common/http';
import { Role } from '@sc-enums/role';
import { SchoolProfile } from './school.model';
import { AdminUser } from './admin.model';
import { StudentProfile } from './student.model';
import { TeacherProfile } from './teacher.model';

export interface AcademicYear {
  id: string;
  academicYear: string;
  current: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface ChatBase {
  id?: string;
  sender: User;
  room?: any;
  recipient?: User;
  content: string;
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

// Case when roomId is present and recipientId is undefined
export interface ChatWithRoom extends ChatBase {}

// Final type that combines all possible cases
export type Chat = ChatRead | ChatUnread;

export interface Class {
  id: string;
  className: string;
  nextClass: string;
  order: number;
  streamsRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginDto {
  username: string;
  password: string;
  remember: boolean;
}

export interface NavItem {
  icon?: string;
  label: string;
  privileges?: Role[];
  routerLink?: string[];
  eventFunction?: Function;
  children?: NavItem[];
}

export type LoggedInUser = UserProfile & {
  user: User;
  school: SchoolProfile;
};

export type UserProfile = AdminUser & StudentProfile & TeacherProfile;

export interface User {
  id: string;
  name: string;
  email: string;
  userName: string;
  password: string;
  profileImageUrl: string;
  role: Role;
  changePassword: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Address {
  town?: string;
  pincode?: string;
  district?: string;
  stateName?: string;
}

export enum AddressSearchKey {
  PINCODE = 'pincode',
  DISTRICT = 'district',
  STATE_NAME = 'stateName',
  TOWN = 'town',
}
export interface LoginResponse {
  token: {
    accessToken: string;
    expiresIn: number;
  };
  userProfile: LoggedInUser;
}

export interface HttpOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export type Nullable<T> = { [K in keyof T]: T[K] | null };

export interface HttpErrorObject {
  statusCode: number;
  message: string;
}
