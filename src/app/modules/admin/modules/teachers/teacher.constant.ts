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

    {
      columnDef: 'action',
      formElement: {
        elementType: 'button-group',
        element: {
          buttons: [
            {
                key: 'edit',
                label: 'Edit',
                theme: 'icon',
                cssClass: 'p-0 col'
              },
              {
                key: 'delete',
                label: 'delete',
                theme: 'icon',
                cssClass: 'p-0 col'
            },
          ],
          key: 'actions',
        },
      },
      header: 'Actions',
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
export const educationFormConfig: FormConfig = [
  {
    elementType: 'select',
    element: {
      label: 'Level of Education',
      key: 'level_of_education',
      cssClass: 'col-md-4',
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
      key: 'institution',
      validateAs: 'text',
      cssClass: 'col-md-4',
      required: true,
    },
  },
  {
    elementType: 'select',
    element: {
      label: 'Field Of Study',
      key: 'field_of_study',
      cssClass: 'col-md-4',
      required: true,
      categoriesList: [
        {
          category: 'Science Stream',
          options: [
            { key: 'physics', label: 'Physics' },
            { key: 'chemistry', label: 'Chemistry' },
            { key: 'mathematics', label: 'Mathematics' },
            { key: 'biology', label: 'Biology' },
            { key: 'computer_science', label: 'Computer Science' },
            { key: 'other', label: 'Other (Specify)' },
          ],
        },
        {
          category: 'Commerce Stream',
          options: [
            { key: 'accountancy', label: 'Accountancy' },
            { key: 'economics', label: 'Economics' },
            { key: 'business_studies', label: 'Business Studies' },
            { key: 'mathematics_commerce', label: 'Mathematics (Commerce Focus)' },
            { key: 'statistics', label: 'Statistics' },
            { key: 'other', label: 'Other (Specify)' },
          ],
        },
        {
          category: 'Arts and Humanities Stream',
          options: [
            { key: 'history', label: 'History' },
            { key: 'geography', label: 'Geography' },
            { key: 'political_science', label: 'Political Science' },
            { key: 'sociology', label: 'Sociology' },
            { key: 'psychology', label: 'Psychology' },
            { key: 'literature', label: 'Literature (English, Hindi, or Regional Language)' },
            { key: 'fine_arts', label: 'Fine Arts' },
            { key: 'philosophy', label: 'Philosophy' },
            { key: 'other', label: 'Other (Specify)' },
          ],
        },
        {
          category: 'Vocational Education',
          options: [
            { key: 'computer_applications', label: 'Computer Applications' },
            { key: 'travel_tourism', label: 'Travel and Tourism' },
            { key: 'fashion_design', label: 'Fashion Design' },
            { key: 'hospitality', label: 'Hospitality Management' },
            { key: 'automotive', label: 'Automotive Technology' },
            { key: 'agriculture', label: 'Agriculture and Allied Sciences' },
            { key: 'healthcare', label: 'Healthcare and Nursing' },
            { key: 'multimedia', label: 'Multimedia and Animation' },
            { key: 'other', label: 'Other (Specify)' },
          ],
        },
        {
          category: 'Undergraduate and Postgraduate Courses',
          options: [
            { key: 'engineering', label: 'Engineering (B.E., B.Tech, M.E., M.Tech)' },
            { key: 'medicine', label: 'Medicine (MBBS, MD, BDS)' },
            { key: 'law', label: 'Law (LLB, LLM)' },
            { key: 'commerce', label: 'Commerce (B.Com, M.Com)' },
            { key: 'arts', label: 'Arts (B.A., M.A.)' },
            { key: 'science', label: 'Science (B.Sc., M.Sc.)' },
            { key: 'architecture', label: 'Architecture (B.Arch, M.Arch)' },
            { key: 'pharmacy', label: 'Pharmacy (B.Pharm, M.Pharm)' },
            { key: 'management', label: 'Management (BBA, MBA)' },
            { key: 'design', label: 'Design (B.Des, M.Des)' },
            { key: 'agriculture', label: 'Agriculture (B.Sc. Agriculture, M.Sc. Agriculture)' },
            { key: 'aviation', label: 'Aviation (Pilot Training, Aeronautics)' },
            { key: 'teaching_education', label: 'Teaching (B.Ed, M.Ed, Integrated Education Programs)' },
            { key: 'other', label: 'Other (Specify)' },
          ],
        },
        {
          category: 'Doctoral and Research Education',
          options: [
            { key: 'phd_science', label: 'PhD in Science' },
            { key: 'phd_arts', label: 'PhD in Arts' },
            { key: 'phd_commerce', label: 'PhD in Commerce' },
            { key: 'phd_engineering', label: 'PhD in Engineering' },
            { key: 'phd_management', label: 'PhD in Management Studies' },
            { key: 'phd_law', label: 'PhD in Law' },
            { key: 'phd_education', label: 'PhD in Education' },
            { key: 'phd_interdisciplinary', label: 'PhD in Interdisciplinary Studies' },
            { key: 'other', label: 'Other (Specify)' },
          ],
        },
        {
          category: 'Other (General)',
          options: [
            { key: 'diploma_courses', label: 'Diploma Courses (Specify)' },
            { key: 'certificate_programs', label: 'Certificate Programs (Specify)' },
            { key: 'custom_field', label: 'Custom Field (Specify Your Interest)' },
            { key: 'not_listed', label: 'Not Listed (Request Addition)' },
          ],
        },
      ],
    },
  },
  {
    elementType: 'text',
    element: {
      label: 'Passing Year',
      key: 'passingYear',
      validateAs: 'number',
      maxLength: 4,
      cssClass: 'col-md-4',
      required: true,
    },
  },
  {
    elementType: 'text',
    element: {
      label: 'GPA',
      key: 'gpa',
      validateAs: 'text',
      cssClass: 'col-md-4',
      required: true,
    },
  },
];
export const experienceFormConfig: FormConfig = [
  {
    elementType: 'text',
    element: {
      label: 'University/Institution Name',
      key: 'institute',
      validateAs: 'text',
      cssClass: 'col-md-4',
      required: true,
    },
  },
  {
    elementType: 'date',
    element: {
      cssClass: 'col-md-4',
      key: 'startDate',
      label: 'Start Date',
    },
  },
  {
    elementType: 'date',
    element: {
      cssClass: 'col-md-4',
      key: 'endDate',
      max: `12/31/${new Date().getFullYear() - 18}`,
      label: 'End Date',
    },
  },
  {
    elementType: 'checkbox',
    element: {
      checked: false,
      cssClass: 'col-md-4',
      key: 'currentlyTeaching',
      label: 'Currently Teaching',
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
  {
    elementType: 'chip',
    element: {
      key: 'subjects',
      label: 'Subjects',
      cssClass: 'col-12',
      required: true,
    },
  },
];
