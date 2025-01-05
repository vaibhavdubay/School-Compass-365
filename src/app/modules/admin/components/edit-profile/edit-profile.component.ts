import { Component, inject } from '@angular/core';
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
  loggedInUser$ = this.sharedStore.loggedInUser$;
  schoolProfile$ = this.sharedStore.School$;
  adminUser$ = this.adminService.adminUser$;

  profileData = {
    userName: 'User Name',
    email: 'Email',
    phoneNumber: 'Mobile',
    gender: 'Gender',
  };

  image!: File;
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
  updateSchoolProfile() {
    // this.adminService.dispatch();
  }
}
