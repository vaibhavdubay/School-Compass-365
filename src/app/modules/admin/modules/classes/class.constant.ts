import { FormConfig } from '@sc-models/form';

export const addShiftFormConfig: FormConfig = [
  {
    elementType: 'text',
    element: {
      key: 'shiftName',
      cssClass: 'col-md-12', // Full width
      label: 'Name your shift',
      placeholder: 'Morning Shift',
      validateAs: 'text',
      required: true,
    },
  },
  {
    elementType: 'date',
    element: {
      key: 'shiftStartTime',
      cssClass: 'col-md-6',
      label: 'Shift Start Time',
      placeholder: '__:__ AM',
    },
  },
  {
    elementType: 'date',
    element: {
      key: 'shiftEndTime',
      cssClass: 'col-md-6',
      label: 'Shift End Time',
      placeholder: '__:__ PM',
    },
  },
  {
    elementType: 'time',
    element: {
      key: 'breakStartTime',
      cssClass: 'col-md-6',
      label: 'Break Start Time',
      minTime: '06:00 AM',
      placeholder: '__:__ AM',
    },
  },
  {
    elementType: 'time',
    element: {
      key: 'breakEndTime',
      cssClass: 'col-md-6',
      maxTime: '06:00 PM',
      label: 'Break End Time',
      placeholder: '__:__ PM',
    },
  },
  {
    elementType: 'select',
    element: {
      key: 'classId',
      cssClass: 'col-md-12',
      label: 'Classes',
      options: [], // Populate dynamically
      placeholder: 'Select Classes',
      required: true,
      allowMultiple: true,
    },
  },
];
