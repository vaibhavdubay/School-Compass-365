import { FormConfig } from '@sc-models/form';

export const addShiftFormConfig: FormConfig = [
  {
    elementType: 'text',
    element: {
      key: 'name',
      cssClass: 'col-md-12', // Full width
      label: 'Name your shift',
      placeholder: 'Morning Shift',
      validateAs: 'text',
      required: true,
    },
  },
  {
    elementType: 'time',
    element: {
      key: 'startTime',
      cssClass: 'col-md-6',
      label: 'Shift Start Time',
      minTime: '06:00 AM',
      maxTime: '05:00 PM',
      placeholder: '__:__ AM',
    },
  },
  {
    elementType: 'time',
    element: {
      key: 'endTime',
      cssClass: 'col-md-6',
      minTime: '06:00 AM',
      maxTime: '05:00 PM',
      label: 'Shift End Time',
      placeholder: '__:__ PM',
      relation: {
        startTime: {
          minTime: (val) => val,
        },
      },
    },
  },
  {
    elementType: 'form-array',
    element: {
      key: 'shiftBreak',
      cssClass: 'w-full',
      max: 3,
      config: [
        {
          elementType: 'time',
          element: {
            key: 'startTime',
            cssClass: 'col-md-6',
            label: 'Break Start Time',
            minTime: '06:00 AM',
            maxTime: '05:00 PM',
            placeholder: '__:__ AM',
          },
        },
        {
          elementType: 'time',
          element: {
            key: 'endTime',
            cssClass: 'col-md-6',
            minTime: '06:00 AM',
            maxTime: '05:00 PM',
            label: 'Break End Time',
            placeholder: '__:__ PM',
            relation: {
              startTime: {
                minTime: (val) => val,
              },
            },
          },
        },
      ],
    },
  },
  {
    elementType: 'select',
    element: {
      key: 'classes',
      cssClass: 'col-md-12',
      label: 'Classes',
      options: [], // Populate dynamically
      placeholder: 'Select Classes',
      required: true,
      allowMultiple: true,
    },
  },
];
