import { SortDirection } from '@angular/material/sort';
import { FormElement } from './form.model';

export interface TableConfig<T = { [k: string]: string }> {
  columns: TableColumn<T>[];
  sort?: TableSort<T>;
  pagination?: TablePagination;
  filter?: TableFilter<T>;
}
export interface TableSort<T = { [k: string]: string }> {
  column?: keyof T;
  direction?: SortDirection;
  disableClear?: boolean;
}

export interface TableFilter<T = { [k: string]: string }> {
  applyColumnLevelFilter?: boolean;
  placeholder?: string;
}

export interface TablePagination {
  pageSizeOptions: number[];
  hidePageSize?: boolean;
  showFirstLastButtons?: boolean;
  disabled?: boolean;
  pageSize?: number;
}

export interface TableColumn<T = { [k: string]: string }> {
  columnDef: keyof T | 'action';
  header: string;
  cell?: (element: T) => string | number | Date | boolean;
  formElement?: FormElement;
}
