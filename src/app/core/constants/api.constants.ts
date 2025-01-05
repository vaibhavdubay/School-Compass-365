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
  school: {
    update: (id: string) => `/school/${id}`,
  },
  teachers: {
    get: '/teacher',
    getById: (id: string) => `/teachers/${id}`,
    update: (id: string) => `/teachers/${id}`,
    delete: (id: string) => `/teachers/${id}`,
  }
};
