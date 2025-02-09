import { Component, inject, viewChild, Inject } from '@angular/core';
import { FormComponent } from '@sc-forms/form.component';
import { addShiftFormConfig } from '../../class.constant';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicListOptions } from '@sc-models/form';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';
import { filter, map } from 'rxjs';
import { ShiftDTO, ShiftSchedule } from '@sc-models/classes';
import { AdminService } from '@sc-modules/admin/services/admin.service';

@Component({
  selector: 'sc-shift-dialog',
  standalone: false,

  templateUrl: './shift-dialog.component.html',
  styleUrl: './shift-dialog.component.scss',
})
export class ShiftDialogComponent {
  dialogRef = inject(MatDialogRef);
  private readonly sharedStore = inject(SharedStoreService);
  private readonly adminService = inject(AdminService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { type: 'edit' | 'create'; id: string }) {}

  readonly addShiftFormComponent = viewChild.required<FormComponent<ShiftDTO>>('addShiftForm');
  readonly addShiftFormConfig = addShiftFormConfig;
  readonly dynamicOptions: DynamicListOptions<keyof ShiftSchedule> = {};

  ngAfterViewInit() {
    this.getClassList();
  }

  get addShiftForm() {
    return this.addShiftFormComponent().formGroup;
  }

  getClassList() {
    this.dynamicOptions['classes'] = this.sharedStore.schoolClasses$.pipe(
      filter((v) => !!v),
      map((v) => [...v]?.sort((a, b) => a?.order - b?.order)?.map((d) => ({ key: d.id, label: d.className }))),
    );
  }

  shiftDialog() {
    if (this.addShiftForm.valid) {
      const shift = {
        ...(this.addShiftForm.value as ShiftDTO),
      };

      if (this.data.type == 'edit') {
        this.adminService.updateShiftProfile(this.data.id, shift);
      } else {
        this.adminService.createShiftProfile(shift);
      }
      this.dialogRef.close({ data: this.addShiftForm.value }); // Send form data
    } else this.addShiftForm.markAllAsTouched();
  }
}
