import { Component, inject, viewChild } from '@angular/core';
import { FormComponent } from '@sc-forms/form.component';
import { AdminUser } from '@sc-models/core';
import { editFormConfig } from '@sc-modules/admin/constants/admin.constant';
import { AdminService } from '@sc-modules/admin/services/admin.service';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';

@Component({
  selector: 'sc-edit-profile',
  standalone: false,

  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  private readonly sharedStore = inject(SharedStoreService);
  private readonly adminService = inject(AdminService);
  readonly form = viewChild.required<FormComponent<AdminUser>>('form');
  loggedInUser$ = this.sharedStore.loggedInUser$;
  schoolProfile$ = this.sharedStore.School$;
  adminUser$ = this.adminService.adminUser$;
  formConfig = editFormConfig;

  profileData = {
    userName: 'User Name',
    email: 'Email',
    phoneNumber: 'Mobile',
    gender: 'Gender',
  };

  image: File | null = null;
  imagePath!: string;

  uploadImage(input: HTMLInputElement) {
    if (input.files && input.files.length > 0) {
      const file = input.files?.item(0);
      if (file) {
        this.image = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePath = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
  keeporder = (a: any, b: any) => 0;
  saveChanges(admin: AdminUser, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.image) {
      const adminUser = {
        ...admin,
        image: this.image,
      };
      this.adminService.updateAdminUserProfile(adminUser);
      this.image = null;
    }
  }
  updatePassword() {
    const form = this.form().formGroup;
    if (form.valid) {
      this.sharedStore.updateUser(form.value);
    } else {
      form.markAllAsTouched();
    }
  }
}
