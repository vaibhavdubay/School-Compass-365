import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { TableModule } from 'src/app/core/modules/table/table.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AddComponent } from './add/add.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

const Materials = [MatTableModule, MatTabsModule, MatButtonModule, MatStepperModule, MatIconModule];

@NgModule({
  declarations: [ListComponent, EditComponent, AddComponent],
  imports: [
    ...Materials,
    CommonModule,
    CoreModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    TeachersRoutingModule,
  ],
})
export class TeachersModule {}
