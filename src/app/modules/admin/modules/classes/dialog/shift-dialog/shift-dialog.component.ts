import { Component, inject, viewChild } from '@angular/core';
import { FormComponent } from '@sc-forms/form.component';
import { addShiftFormConfig } from '../../class.constant';
import { MatDialogRef } from '@angular/material/dialog';
import { DynamicListOptions } from '@sc-models/form';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';
import { filter, map } from 'rxjs';
import { ShiftSchedule } from '@sc-models/classes';

@Component({
  selector: 'sc-shift-dialog',
  standalone: false,

  templateUrl: './shift-dialog.component.html',
  styleUrl: './shift-dialog.component.scss',
})
export class ShiftDialogComponent {
  private dialogRef = inject(MatDialogRef);
  private readonly sharedStore = inject(SharedStoreService);

  readonly addShiftFormComponent = viewChild.required<FormComponent>('addShiftForm');
  readonly addShiftFormConfig = addShiftFormConfig;
  readonly dynamicOptions: DynamicListOptions<keyof ShiftSchedule> = {};

  ngAfterViewInit() {
    this.getClassList();
  }

  get addShiftForm() {
    return this.addShiftFormComponent().formGroup;
  }

  getClassList() {
    this.dynamicOptions['classId'] = this.sharedStore.schoolClasses$.pipe(
      filter((v) => !!v),
      map((v) => [...v]?.sort((a, b) => a?.order - b?.order)?.map((d) => ({ key: d.id, label: d.className }))),
    );
  }

  shiftDialog(event: 'cancel' | 'save') {
    switch (event) {
      case 'cancel':
        this.dialogRef.close(); // No data on cancel
        break;
      case 'save':
        this.dialogRef.close({ data: this.addShiftForm.value }); // Send form data
        break;
    }
  }
}
