import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, inject, viewChild } from '@angular/core';
import { FormComponent } from '@sc-forms/form.component';
import { Class, SchoolProfile } from '@sc-models/core';
import { schoolFormConfig } from '@sc-modules/admin/constants/admin.constant';
import { AdminService } from '@sc-modules/admin/services/admin.service';
import { ScreenSizeObserver } from 'src/app/core/service/screen.service';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';
import { school as schoolActions } from '@sc-modules/admin/state/action';
import { DynamicListOptions } from '@sc-models/form';
import { map, of } from 'rxjs';
import { states } from 'src/app/core/constants/states.constant';

@Component({
  selector: 'sc-school-profile',
  templateUrl: './school-profile.component.html',
  styleUrl: './school-profile.component.scss',
  standalone: false,
})
export class SchoolProfileComponent implements AfterViewInit {
  private readonly sharedStore = inject(SharedStoreService);
  private readonly adminService = inject(AdminService);
  readonly screenObserver = inject(ScreenSizeObserver);
  readonly states: {[k:string]: string} = states
  readonly formConfig = schoolFormConfig;
  readonly form = viewChild.required<FormComponent<SchoolProfile>>('form');
  schoolProfile?: SchoolProfile;
  image!: File;

  items: Class[] = [];
  basket: Class[] = [];

  dynamicOptions: DynamicListOptions<keyof SchoolProfile> = {};
  constructor() {
    this.sharedStore.School$.subscribe((schoolProfile) => {
      this.schoolProfile = schoolProfile;
      this.basket = [...schoolProfile.classes].sort((a, b) => a.order - b.order);
      const form = this.form();
      if (form) form.formValue = schoolProfile;
      this.handleDynamicOptions();
    });
    this.adminService.classes$.subscribe((classes) => {
      this.items = [...classes.filter((c) => !this.basket.some((c2) => c.order == c2.order))];
      if (!this.basket.length) {
        this.items = [...classes];
      }
    });
  }
  ngAfterViewInit(): void {
    if (this.schoolProfile) {
      this.form().formValue = this.schoolProfile;
      this.handleDynamicOptions();
    }
  }

  drop(event: CdkDragDrop<Class[]>) {
    if (event.previousContainer != event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.items = this.items.sort((a, b) => a.order - b.order);
    this.basket = this.basket.sort((a, b) => a.order - b.order);

    const [start, end] = [this.basket[0].order, this.basket[this.basket.length - 1].order];
    const items = this.items.filter((a) => a.order > start && a.order < end);
    this.items = this.items.filter((a) => !items.some((item) => item.order == a.order));
    this.basket = this.basket.concat(items);
    this.items = this.items.sort((a, b) => a.order - b.order);
    this.basket = this.basket.sort((a, b) => a.order - b.order);
  }

  uploadImage(input: HTMLInputElement) {
    if(input.files && input.files.length > 0) {
      const file = input.files?.item(0);
      if(file) {
        this.image = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if(this.schoolProfile) this.schoolProfile = {...this.schoolProfile, logoUrl: e.target.result};
        };
        reader.readAsDataURL(file);
      }
    }
  }

  updateSchoolProfile() {
    const school = {
      ...this.schoolProfile,
      ...this.form().formGroup.value,
      classes: this.basket,
      id: this.schoolProfile?.id,
      image: (this.image)
    };
    if(this.image){
      delete school.logoUrl;
    }
    this.adminService.dispatch(schoolActions.updateSchool({ school }));
  }

  handleDynamicOptions(){
    const formControls = this.form().formGroup.controls;
    this.dynamicOptions['state'] = this.sharedStore.addressStates$.pipe(map((v)=> v.map((d)=> ({key: d, label: d}))));
    this.dynamicOptions['city'] = this.sharedStore.addressDistrict$(formControls.state.value).pipe(map((v)=> v.map((d)=> ({key: d, label: d}))));
    this.dynamicOptions['pincode'] = this.sharedStore.addressPincode$(formControls.state.value, formControls.city.value).pipe(map((v)=> v.map((d)=> ({key: d, label: d}))));

    formControls.state.valueChanges.subscribe((state)=> {
      if(state) {
        formControls.city.setValue('', { emitEvent: false});
        formControls.pincode.setValue('', { emitEvent: false});
        formControls.city.enable({ emitEvent: false});
        formControls.pincode.disable({ emitEvent: false});
        this.dynamicOptions['pincode'] = of([])
        this.dynamicOptions['city'] = this.sharedStore.addressDistrict$(state).pipe(map((v)=> v.map((d)=> ({key: d, label: d}))));
      }
    })
    formControls.city.valueChanges.subscribe((city)=> {
      const state = formControls.state.value;
      formControls.pincode.setValue('', { emitEvent: false});
      this.dynamicOptions['pincode'] = of([])
      if(state && city && formControls.city.enabled){
        formControls.pincode.enable({ emitEvent: false});  
        this.dynamicOptions['pincode'] = this.sharedStore.addressPincode$(state, city).pipe(map((v)=> v.map((d)=> ({key: d, label: d}))));
      }
    })
  }
}
