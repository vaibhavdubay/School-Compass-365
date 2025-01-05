import { NavItem, TeacherProfile } from '@sc-models/core';
import { FormConfig } from '@sc-models/form';
import { TableConfig } from '@sc-models/table';

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
      key: 'address1',
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

export const teachersTableConfig: TableConfig<TeacherProfile> = {
  columns: [
    {
      columnDef: 'firstName',
      cell: (row: TeacherProfile) => `${row.firstName} ${row.lastName}`,
      header: 'Name',
    },
    {
      columnDef: 'email',
      header: 'Email',
    },
    {
      columnDef: 'phoneNumber',
      header: 'Phone',
    },
    {
      columnDef: 'createdAt',
      cell: (row: TeacherProfile) => new Date(row.createdAt).toLocaleString(),
      header: 'Joining Date',
    },
  ],
  pagination: {
    pageSizeOptions: [10, 25, 50, 100],
  },
  sort: {
    direction: 'asc',
    column: 'firstName',
  },
};
