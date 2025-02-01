import { Component, inject, viewChild } from '@angular/core';
import { FormArrayComponent } from '@sc-forms/form-array/form-array.component';
import { FormComponent } from '@sc-forms/form.component';
import { StudentProfile, ParentOrGuardian, StudentProfileDTO } from '@sc-models/core';
import { DynamicListOptions } from '@sc-models/form';
import { AdminService } from '@sc-modules/admin/services/admin.service';
import { filter, map, of } from 'rxjs';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';
import { studentPersonalInformationFormConfig, parentsOrGuardianFormConfig, addFormConfig } from '../student.constant';
import { Router } from '@angular/router';

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
  private readonly router = inject(Router);


  readonly studentPersonalInformationFormConfig = studentPersonalInformationFormConfig;
  readonly parentsOrGuardianFormConfig = parentsOrGuardianFormConfig;
  readonly dynamicOptions: DynamicListOptions<keyof StudentProfileDTO> = {};
  readonly addFormConfig = addFormConfig;
  readonly student: StudentProfile = history.state['student'];

  currentTabIndex = 0;

  image: File | null = null;

  ngAfterViewInit(): void {
    this.handleDynamicOptions();
    this.studentInfoForm.patchValue(this.student);
  }

  get studentInfoForm() {
    return this.studentFormComponents().formGroup;
  }

  get ParentOrGuardianForms() {
    return this.parentOrGuardianFormComponents().formArray;
  }

  get credForms() {
    return this.credFormComponents().formGroup;
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
            this.save()
          } else {
            this.studentInfoForm.markAllAsTouched();
            this.ParentOrGuardianForms.markAllAsTouched();
          }
          break
      default:
        break;
    }
  }

  handleDynamicOptions() {
    const formControls = this.studentInfoForm.controls;
    this.dynamicOptions['state'] = this.sharedStore.addressStates$.pipe(
      map((v) => v.map((d) => ({ key: d, label: d }))),
    );
    this.dynamicOptions['city'] = of([]);
    this.dynamicOptions['pincode'] = of([]);
    this.dynamicOptions['classId'] = this.sharedStore.schoolClasses$.pipe(
          filter((v) => !!v),
          map((v) => [...v]?.sort((a,b)=>a?.order-b?.order)?.map((d) => ({ key: d.id, label: d.className }))),
        )

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
      image: this.image,
    };
    this.adminService.updateStudentProfile(this.student.id, studentProfile);
    this.router.navigate(['admin', 'students'])
  }
}
