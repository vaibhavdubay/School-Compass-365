import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassListComponent } from './class-list/class-list.component';
import { CoreModule } from 'src/app/core/core.module';
import { ShiftDialogComponent } from './dialog/shift-dialog/shift-dialog.component';
import { FormsModule as SCFormsModule } from '@sc-forms/forms.module';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@NgModule({
  declarations: [ClassListComponent, ShiftDialogComponent],
  imports: [CommonModule, SCFormsModule, CoreModule, MatIcon, MatButton, ClassesRoutingModule],
})
export class ClassesModule {}
