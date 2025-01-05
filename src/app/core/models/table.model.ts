import { SortDirection } from '@angular/material/sort';
import { FormElement } from './form.model';

export interface TableConfig<T = { [k: string]: string }> {
  columns: TableColumn<T>[];
  sort?: TableSort<T>;
  pagination?: TablePagination;
}
export interface TableSort<T = { [k: string]: string }> {
  column?: keyof T;
  direction?: SortDirection;
  disableClear?: boolean;
}

export interface TablePagination {
  pageSizeOptions: number[];
  hidePageSize?: boolean;
  showFirstLastButtons?: boolean;
  disabled?: boolean;
  pageSize?: number;
}

export interface TableColumn<T = { [k: string]: string }> {
  columnDef: keyof T;
  header: string;
  cell?: (element: T) => string | number | Date | boolean;
  formElement?: FormElement;
}
