import { AddressSearchKey } from '@sc-models/core';

export const apiRoutes = {
  auth: {
    profile: '/auth/profile',
    signin: `/auth/sign-in`,
    sendOtp: `/auth/send-otp`,
    resetPassword: `/auth/reset-password`,
  },
  admin: {
    update: (id: string) => `/admin/${id}`,
  },
  users: {
    update: (id: string) => `/users/${id}`,
  },
  address: {
    completeAddress: `/address-helper`,
    addressKey: (key: AddressSearchKey) => `/address-helper/${key}`,
  },
  class: {
    get: '/class',
  },
  chat: {
    get: '/chat',
    create: '/chat',
    getList: '/chat/list',
    update: (chatId: string) => `/chat/${chatId}`,
    delete: (chatId: string) => `/chat/${chatId}`
  },
  school: {
    update: (id: string) => `/school/${id}`,
    dashboard: `/school/dashboard`,
  },
  teachers: {
    get: '/teacher',
    create: '/teacher',
    getById: (id: string) => `/teacher/${id}`,
    update: (id: string) => `/teacher/${id}`,
    delete: (id: string) => `/teacher/${id}`,
  }
};
