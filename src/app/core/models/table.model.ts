import { SortDirection } from '@angular/material/sort';
import { FormElement } from './form.model';

export interface TableConfig<T> {
  columns: TableColumn<T>[];
  sort?: TableSort;
  pagination?: TablePagination;
}
export interface TableSort {
  column?: string;
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

export interface TableColumn<T> {
  columnDef: string;
  header: string;
  cell?: (element: T) => string | number | Date | boolean;
  formElement?: FormElement;
}
