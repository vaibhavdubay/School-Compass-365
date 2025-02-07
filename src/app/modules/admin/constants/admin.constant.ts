import { NavItem } from '@sc-models/core';
import { FormConfig } from '@sc-models/form';

export const sideNavConfig: NavItem[] = [
  {
    icon: 'analytics',
    label: 'Dashboard',
    routerLink: ['./dashboard'],
  },
  {
    icon: 'co_present',
    label: 'Teachers',
    routerLink: ['./teachers'],
  },
  {
    icon: 'local_library',
    label: 'Students',
    routerLink: ['./students'],
  },
  {
    icon: 'class',
    label: 'Classes',
    routerLink: ['./classes'],
  },
  {
    icon: 'assignment',
    label: 'Examinations',
    routerLink: ['./examinations'],
  },
  {
    icon: 'event',
    label: 'Events',
    routerLink: ['./events'],
  },
  {
    icon: 'list',
    label: 'Leaves',
    routerLink: ['./leaves'],
  },
  {
    icon: 'move_down',
    label: 'Transferred',
    routerLink: ['./transferred'],
  },
];

export const schoolFormConfig: FormConfig = [
  {
    elementType: 'text',
    element: {
      key: 'phoneNumber',
      validateAs: 'number',
      required: true,
      label: 'Phone',
      cssClass: 'col-md-4',
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'email',
      validateAs: 'email',
      cssClass: 'col-md-4',
      value: 'sirvaibhavdubay@gmail.com',
      label: 'Email',
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'address',
      validateAs: 'text',
      cssClass: 'col-md-4',
      label: 'Address',
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'town',
      validateAs: 'text',
      cssClass: 'col-md-4',
      label: 'Town',
    },
  },
  {
    elementType: 'select',
    element: {
      key: 'city',
      options: [],
      cssClass: 'col-md-4',
      label: 'City',
    },
  },
  {
    elementType: 'select',
    element: {
      key: 'state',
      options: [],
      cssClass: 'col-md-4',
      label: 'State / Province',
    },
  },
  {
    elementType: 'select',
    element: {
      key: 'pincode',
      options: [],
      cssClass: 'col-md-4',
      label: 'Zip / Postal Code',
    },
  },
  {
    elementType: 'select',
    element: {
      key: 'country',
      value: 'india',
      options: [
        {
          key: 'india',
          label: 'India',
        },
      ],
      disabled: true,
      cssClass: 'col-md-4',
      label: 'Country / Region',
    },
  },
];

export const editFormConfig: FormConfig = [
  {
    elementType: 'label',
    element: {
      key: 'change-password',
      label: 'Change Password',
      cssClass: 'col-12 pb-2',
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'password',
      validateAs: 'password',
      required: true,
      label: 'Password',
      cssClass: 'col-12',
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'confirmpassword',
      validateAs: 'confirmPassword',
      cssClass: 'col-12',
      required: true,
      label: 'Confirm Password',
    },
  },
  {
    elementType: 'button',
    element: {
      key: 'submit',
      label: 'Change Password',
      cssClass: 'col-12 mt-1',
      color: 'primary',
      theme: 'raised',
    },
  },
];
