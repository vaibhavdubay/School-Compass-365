import { Component, ViewChild } from '@angular/core';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';
import { FormConfig } from '@sc-models/form';
import { FormComponent } from '@sc-forms/form.component';
import { sideNavConfig } from '../constants/admin.constant';

@Component({
  selector: 'sc-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  formConfig: FormConfig = [
    {
      elementType: 'text',
      element: {
        key: 'firstName',
        validateAs: 'text',
        required: true,
        label: 'First Name',
        cssClass: 'col-md-4',
      },
    },
    {
      elementType: 'text',
      element: {
        key: 'lastName',
        validateAs: 'text',
        cssClass: 'col-md-4',
        label: 'Last Name',
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
      elementType: 'date',
      element: {
        key: 'date',
        label: 'Date',
      },
    },
    {
      elementType: 'button-group',
      element: {
        key: 'submit',
        cssClass: 'col-md-12 text-center',
        buttons: [
          {
            elementType: 'button',
            element: {
              key: 'submit',
              type: 'submit',
              cssClass: 'col',
              theme: 'raised',
              color: 'primary',
              label: 'Submit',
            },
          },
          {
            elementType: 'button',
            element: {
              key: 'reset',
              theme: 'raised',
              cssClass: 'col',
              type: 'reset',
              color: 'accent',
              label: 'Reset',
            },
          },
        ],
        label: 'Submit',
      },
    },
  ];

  navConfig = sideNavConfig;

  @ViewChild('form') formComponent!: FormComponent<{
    firstName: string;
    lastName: string;
    email: string;
  }>;

  get FormGroup() {
    return this.formComponent?.formGroup;
  }

  constructor(private sharedStoreService: SharedStoreService) {
    sharedStoreService.loggedInUser$.subscribe((user) => console.log(user));
    this.FormGroup;
  }
}
