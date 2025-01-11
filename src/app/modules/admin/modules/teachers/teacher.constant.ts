import { GENDER } from '@sc-enums/gender';
import { TeacherProfile } from '@sc-models/core';
import { FormConfig } from '@sc-models/form';
import { TableConfig } from '@sc-models/table';

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
  filter: {},
};
export const personalInformationFormConfig: FormConfig = [
  {
    elementType: 'text',
    element: {
      key: 'firstName',
      cssClass: 'col-md-4',
      label: 'First Name',
      validateAs: 'text',
      required: true,
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'lastName',
      cssClass: 'col-md-4',
      label: 'Last Name',
      validateAs: 'text',
      required: true,
    },
  },
  {
    elementType: 'date',
    element: {
      cssClass: 'col-md-4',
      key: 'dateOfBirth',
      label: 'Date of Birth',
      max: `12/31/${new Date().getFullYear() - 18}`,
      required: true,
    },
  },
  {
    elementType: 'radio',
    element: {
      cssClass: 'col-md-4 d-flex align-items-center',
      key: 'gender',
      label: 'Gender',
      required: true,
      options: [
        {
          key: GENDER.MALE,
          label: 'Male',
        },
        {
          key: GENDER.FEMALE,
          label: 'Female',
        },
        {
          key: GENDER.OTHER,
          label: 'Other',
        },
      ],
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'phoneNumber',
      cssClass: 'col-md-4',
      label: 'Phone Number',
      validateAs: 'number',
      required: true,
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'email',
      label: 'Email',
      cssClass: 'col-md-4',
      validateAs: 'email',
      required: true,
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'address',
      validateAs: 'text',
      cssClass: 'col-md-4',
      required: true,
      label: 'Address',
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'town',
      validateAs: 'text',
      cssClass: 'col-md-4',
      required: true,
      label: 'Town',
    },
  },
  {
    elementType: 'select',
    element: {
      key: 'city',
      options: [],
      cssClass: 'col-md-4',
      required: true,
      label: 'City',
    },
  },
  {
    elementType: 'select',
    element: {
      key: 'state',
      options: [],
      required: true,
      cssClass: 'col-md-4',
      label: 'State / Province',
    },
  },
  {
    elementType: 'select',
    element: {
      key: 'pincode',
      options: [],
      required: true,
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
export const educationAndExperienceFormConfig: FormConfig = [
  {
    elementType: 'select',
    element: {
      label: 'Highest Level of Education',
      key: 'highestLevelOfEducation',
      cssClass: 'col-md-6',
      required: true,
      options: [
        {
          key: 'high_school',
          label: 'High School (10th)',
        },
        {
          key: 'higher_secondary',
          label: 'Higher Secondary (12th)',
        },
        {
          key: 'graduate',
          label: "Graduate (Bachelor's Degree)",
        },
        {
          key: 'postgraduate',
          label: "Postgraduate (Master's Degree)",
        },
        {
          key: 'doctorate',
          label: 'Doctorate (PhD)',
        },
        {
          key: 'diploma',
          label: 'Diploma/Certificate Courses',
        },
        {
          key: 'professional_course',
          label: 'Professional Courses (e.g., CA, CS, etc.)',
        },
        {
          key: 'other',
          label: 'Other',
        },
      ],
    },
  },
  {
    elementType: 'text',
    element: {
      label: 'University/Institution Name',
      key: 'universityName',
      validateAs: 'text',
      cssClass: 'col-md-6',
      required: true,
    },
  },
  {
    elementType: 'text',
    element: {
      label: 'Passing Year',
      key: 'passingYear',
      validateAs: 'text',
      cssClass: 'col-md-6',
      required: true,
    },
  },
];
export const addFormConfig: FormConfig = [
  {
    elementType: 'text',
    element: {
      key: 'userName',
      cssClass: 'col-md-6',
      label: 'User Name',
      validateAs: 'text',
      required: true,
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'password',
      cssClass: 'col-md-6',
      label: 'Password',
      validateAs: 'password',
      required: true,
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'aadhar_number',
      cssClass: 'col-md-6',
      label: 'Aadhar Number',
      validateAs: 'number',
      required: true,
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'years_of_experience',
      label: 'Years of Experience',
      validateAs: 'decimal',
      cssClass: 'col-md-6',
      required: true,
    },
  },
];
