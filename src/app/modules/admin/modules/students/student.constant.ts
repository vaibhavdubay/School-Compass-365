import { GENDER } from "@sc-enums/gender";
import { StudentProfile } from "@sc-models/core";
import { FormConfig } from "@sc-models/form";
import { TableConfig } from "@sc-models/table";



export const StudentsTableConfig: TableConfig<StudentProfile> = {
    columns: [
      {
        columnDef: 'firstName',
        cell: (row: StudentProfile) => `${row.firstName} ${row.lastName}`,
        header: 'Name',
      },
      {
        columnDef: 'class',
        header: 'Class',
        cell: (row: StudentProfile) => `${row.class.className}`,
      },
      {
        columnDef: 'phoneNumber',
        header: 'Phone',
      },
      {
        columnDef: 'parentsGuardians',
        cell: (row: StudentProfile) => `${row.parentsGuardians[0].name}`,
        header: 'Parents Name',
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
export const studentPersonalInformationFormConfig: FormConfig = [
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
      elementType: 'date',
      element: {
        cssClass: 'col-md-4',
        key: 'dateOfBirth',
        label: 'Date of Birth',
        max: `12/31/${new Date().getFullYear() - 3}`,
        required: true,
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
        key: 'aadhar_number',
        cssClass: 'col-md-4',
        label: 'Aadhar Number',
        validateAs: 'number',
        required: true,
      },
    },
    {
      elementType: 'text',
      element: {
        key: 'bloodGroup',
        validateAs:'text',
        cssClass: 'col-md-4',
        label: 'Blood Group',
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
  ];
  export const parentsOrGuardianFormConfig: FormConfig = [
    {
      elementType: 'text',
      element: {
        key: 'name',
        cssClass: 'col-md-4',
        label: 'Name',
        validateAs: 'text',
        required: true,
      },
    },
    {
      elementType: 'text',
      element: {
        key: 'relations',
        cssClass: 'col-md-4',
        label: 'Relations',
        validateAs: 'text',
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
        key: 'contactPhone',
        label: 'Phone Contact',
        validateAs: 'decimal',
        cssClass: 'col-md-4',
        required: true,
      },
    },
    {
      elementType: 'text',
      element: {
        key: 'contactEmail',
        cssClass: 'col-md-4',
        label: 'Email',
        validateAs: 'text',
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
          key: 'pen',
          validateAs: 'text',
          cssClass: 'col-md-6',
          label: 'PEN',
        },
      },
      {
        elementType: 'select',
        element: {
          key: 'classId',
          options: [],
          cssClass: 'col-md-6',
          label: 'Class',
          required: true,
        },
      },
  ];