import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { TableModule } from 'src/app/core/modules/table/table.module';
import { CoreModule } from 'src/app/core/core.module';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';


const Materials = [MatTableModule, MatTabsModule, MatButtonModule, MatStepperModule, MatIconModule];


@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    ...Materials,
    CommonModule,
    CoreModule,
    StudentsRoutingModule,
    TableModule
  ]
})
export class StudentsModule { }
