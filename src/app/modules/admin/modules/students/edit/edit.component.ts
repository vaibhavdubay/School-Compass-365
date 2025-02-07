import { Component, inject, viewChild } from '@angular/core';
import { FormArrayComponent } from '@sc-forms/form-array/form-array.component';
import { FormComponent } from '@sc-forms/form.component';
import { DynamicListOptions } from '@sc-models/form';
import { AdminService } from '@sc-modules/admin/services/admin.service';
import { filter, map, of } from 'rxjs';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';
import { studentPersonalInformationFormConfig, parentsOrGuardianFormConfig, addFormConfig } from '../student.constant';
import { User } from '@sc-models/core';
import { StudentProfile, ParentOrGuardian, StudentProfileDTO } from '@sc-models/student';

@Component({
  selector: 'sc-edit',
  standalone: false,

  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  readonly studentFormComponents = viewChild.required<FormComponent<StudentProfile>>('createStudentForm');
  readonly credFormComponents =
    viewChild.required<FormComponent<StudentProfile & { userName: string; password: string }>>('credForm');
  readonly parentOrGuardianFormComponents =
    viewChild.required<FormArrayComponent<ParentOrGuardian>>('ParentOrGuardian');

  private readonly sharedStore = inject(SharedStoreService);
  private readonly adminService = inject(AdminService);

  readonly student: StudentProfile = history.state['student'];
  readonly studentPersonalInformationFormConfig = studentPersonalInformationFormConfig;
  readonly parentsOrGuardianFormConfig = parentsOrGuardianFormConfig;
  readonly dynamicOptions: DynamicListOptions<keyof StudentProfile> = {};
  readonly addFormConfig = addFormConfig;

  currentTabIndex = 0;

  image: File | null = null;

  get studentInfoForm() {
    return this.studentFormComponents().formGroup;
  }

  get ParentOrGuardianForms() {
    return this.parentOrGuardianFormComponents().formArray;
  }

  get credForms() {
    return this.credFormComponents().formGroup;
  }

  ngAfterViewInit(): void {
    if (typeof document == 'undefined') return;
    setTimeout(() => {
      this.studentInfoForm.patchValue(this.student);
      const user = (this.student as any)['user'] as User;
      this.credForms.controls.userName.setValue(user.userName);
      this.credForms.controls.classId.setValue(this.student.classId);
      this.credForms.controls.userName.disable();
      this.credForms.patchValue({ ...this.student });
      this.parentOrGuardianFormComponents().patchValue(this.student['parentsGuardians']);
      console.log(JSON.stringify(this.ParentOrGuardianForms.value));
      this.handleDynamicOptions();
    }, 500); // Adjust the timeout duration as needed
  }

  handleStepIndex() {
    switch (this.currentTabIndex) {
      case 0:
        if (this.studentInfoForm.valid) {
          this.currentTabIndex = 1;
        } else {
          this.studentInfoForm.markAllAsTouched();
        }
        break;
      case 1:
        if (this.studentInfoForm.valid && this.ParentOrGuardianForms.valid) {
          this.save();
        } else {
          this.studentInfoForm.markAllAsTouched();
          this.ParentOrGuardianForms.markAllAsTouched();
        }
        this.currentTabIndex = 1;
        break;
      case 2:
        if (this.studentInfoForm.valid && this.ParentOrGuardianForms.valid) {
          this.save();
        } else {
          this.studentInfoForm.markAllAsTouched();
          this.ParentOrGuardianForms.markAllAsTouched();
        }
        break;
      default:
        break;
    }
  }

  handleDynamicOptions() {
    const formControls = this.studentInfoForm.controls;
    this.dynamicOptions['state'] = this.sharedStore.addressStates$.pipe(
      map((v) => v.map((d) => ({ key: d, label: d }))),
    );
    this.dynamicOptions['city'] = this.sharedStore
      .addressDistrict$(formControls.state.value)
      .pipe(map((v) => v.map((d) => ({ key: d, label: d }))));

    this.dynamicOptions['pincode'] = this.sharedStore
      .addressPincode$(formControls.state.value, formControls.city.value)
      .pipe(map((v) => v.map((d) => ({ key: d, label: d }))));

    this.dynamicOptions['classId'] = this.sharedStore.schoolClasses$.pipe(
      filter((v) => !!v),
      map((v) => [...v]?.sort((a, b) => a?.order - b?.order)?.map((d) => ({ key: d.id, label: d.className }))),
    );
    console.log(JSON.stringify(this.studentInfoForm.value), 'pp');

    formControls.state.valueChanges.subscribe((state) => {
      if (state) {
        formControls.city.setValue('', { emitEvent: false });
        formControls.pincode.setValue('', { emitEvent: false });
        formControls.city.enable({ emitEvent: false });
        formControls.pincode.disable({ emitEvent: false });
        this.dynamicOptions['pincode'] = of([]);
        this.dynamicOptions['city'] = this.sharedStore
          .addressDistrict$(state)
          .pipe(map((v) => v.map((d) => ({ key: d, label: d }))));
      }
    });
    formControls.city.valueChanges.subscribe((city) => {
      const state = formControls.state.value;
      formControls.pincode.setValue('', { emitEvent: false });
      this.dynamicOptions['pincode'] = of([]);
      if (state && city && formControls.city.enabled) {
        console.log(JSON.stringify(this.studentInfoForm.value), 'kk');

        formControls.pincode.enable({ emitEvent: false });
        this.dynamicOptions['pincode'] = this.sharedStore
          .addressPincode$(state, city)
          .pipe(map((v) => v.map((d) => ({ key: d, label: d }))));
      }
    });
  }

  save() {
    const studentProfile: StudentProfileDTO = {
      ...(this.studentInfoForm.value as StudentProfile),
      ...(this.credForms.value as StudentProfile & { userName: string; password: string }),
      parentsGuardians: this.ParentOrGuardianForms.value,
      image: this.image,
    };
    this.adminService.updateStudentProfile(this.student.id, studentProfile);
  }
}
