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
    create: '/class',
    getById: (id: string) => `/class/${id}`,
    update: (id: string) => `/class/${id}`,
    delete: (id: string) => `/class/${id}`,
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
  },
  students: {
    get: '/student',
    create: '/student',
    getById: (id: string) => `/student/${id}`,
    update: (id: string) => `/student/${id}`,
    delete: (id: string) => `/student/${id}`,
  },
};
