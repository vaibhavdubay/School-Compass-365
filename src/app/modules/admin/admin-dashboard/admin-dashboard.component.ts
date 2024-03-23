import { Component, ViewChild } from '@angular/core';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';
import { CoreModule } from '../../../core/core.module';
import { FormsModule } from '@sc-forms/forms.module';
import { FormConfig } from '@sc-models/form';
import { FormComponent } from '@sc-forms/form.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'sc-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
  imports: [CoreModule, FormsModule, ReactiveFormsModule],
})
export class AdminDashboardComponent {
  formConfig: FormConfig = [
    {
      elementType: 'text',
      element: {
        key: 'firstName',
        required: true,
        label: 'First Name',
      },
    },
    {
      elementType: 'text',
      element: {
        key: 'lastName',
        disabled: true,
        label: 'Last Name',
      },
    },
  ];

  @ViewChild('form') formComponent!: FormComponent<{
    firstName: string;
    lastName: string;
  }>;

  get FormGroup() {
    return this.formComponent?.formGroup;
  }

  constructor(private sharedStoreService: SharedStoreService) {
    sharedStoreService.loggedInUser$.subscribe((user) => console.log(user));
  }
}
