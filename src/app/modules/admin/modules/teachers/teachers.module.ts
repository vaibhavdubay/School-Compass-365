import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { TableModule } from 'src/app/core/modules/table/table.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    TableModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    TeachersRoutingModule
  ]
})
export class TeachersModule { }
