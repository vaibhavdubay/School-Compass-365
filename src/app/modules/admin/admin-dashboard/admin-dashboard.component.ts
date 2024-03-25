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
