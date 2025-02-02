import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@sc-forms/forms.module';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatDividerModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  exports: [TableComponent, FormsModule],
})
export class TableModule {}
