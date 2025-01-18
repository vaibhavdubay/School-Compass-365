import { AfterViewInit, Component, inject, viewChild, viewChildren } from '@angular/core';
import {
  addFormConfig,
  educationFormConfig,
  experienceFormConfig,
  personalInformationFormConfig,
} from '../teacher.constant';
import { TeacherProfile } from '@sc-models/core';
import { DynamicListOptions } from '@sc-models/form';
import { FormComponent } from '@sc-forms/form.component';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';
import { AdminService } from '@sc-modules/admin/services/admin.service';
import { map, of } from 'rxjs';

@Component({
  selector: 'sc-add',
  standalone: false,

  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent implements AfterViewInit {
  readonly personalInfoForm = viewChild.required<FormComponent<TeacherProfile>>('personalInfoForm');
  readonly educationFormComponents = viewChildren<FormComponent<TeacherProfile>>('educationForm');
  readonly experienceFormComponents = viewChildren<FormComponent<TeacherProfile>>('experience');
  private readonly sharedStore = inject(SharedStoreService);
  private readonly adminService = inject(AdminService);

  readonly personalInformationFormConfig = personalInformationFormConfig;
  readonly educationFormConfig = educationFormConfig;
  readonly experienceFormConfig = experienceFormConfig;
  readonly addFormConfig = addFormConfig;

  readonly dynamicOptions: DynamicListOptions<keyof TeacherProfile> = {};

  readonly additionalEducations: number[] = [];
  readonly additionalExperiences: number[] = [1];

  currentTabIndex = 0;

  image: File | null = null;
  imagePath!: string;

  get educationForms() {
    return this.educationFormComponents().map((c) => c.formGroup);
  }

  get experienceForms() {
    return this.experienceFormComponents().map((c) => c.formGroup);
  }

  ngAfterViewInit(): void {
    this.handleDynamicOptions();
  }

  handleStepIndex() {
    switch (this.currentTabIndex) {
      case 0:
        if (this.personalInfoForm().formGroup.valid) {
          this.currentTabIndex = 1;
        } else {
          this.personalInfoForm().formGroup.markAllAsTouched();
        }
        break;
      case 1:
        this.currentTabIndex = 2;
        break;
      case 2:
        // this.uploadImageToFirebase();
        break;
      default:
        break;
    }
  }
  deleteAdditionalEducations(type: 'education' | 'experience', index: number) {
    switch (type) {
      case 'education':
        this.additionalEducations.splice(index, 1);
        break;
      case 'experience':
        this.additionalExperiences.splice(index, 1);
        break;
    }
  }

  addMore(type: 'education' | 'experience') {
    let last = 0;
    switch (type) {
      case 'education':
        last = this.additionalEducations?.[this.additionalEducations.length - 1] || 0;
        this.additionalEducations.push(last + 1);
        break;
      case 'experience':
        last = this.additionalExperiences?.[this.additionalExperiences.length - 1] || 0;
        this.additionalExperiences.push(last + 1);
        break;
    }
  }
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

  handleDynamicOptions() {
    const formControls = this.personalInfoForm().formGroup.controls;
    this.dynamicOptions['state'] = this.sharedStore.addressStates$.pipe(
      map((v) => v.map((d) => ({ key: d, label: d }))),
    );
    this.dynamicOptions['city'] = of([]);
    this.dynamicOptions['pincode'] = of([]);

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
}
