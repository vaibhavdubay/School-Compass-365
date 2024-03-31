import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableConfig } from '@sc-models/table';

@Component({
  selector: 'sc-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T = object> implements OnChanges {
  @Input() config: TableConfig<T> = {
    columns: [],
  };
  @Input() data: T[] = [];

  @Output() buttonClick = new EventEmitter<{
    key: string;
    row: T;
  }>();

  @ViewChild(MatPaginator) public get paginator(): MatPaginator {
    return this._paginator;
  }
  public set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
    this._paginator = value;
  }

  @ViewChild(MatSort)
  public get sort(): MatSort {
    return this._sort;
  }
  public set sort(value: MatSort) {
    const sort = this.config.sort;
    value.disabled = !sort;
    if (sort && !this._sort) {
      sort.column && (value.active = sort.column);
      sort.direction && (value.direction = sort.direction);
      sort.disableClear && (value.disableClear = sort.disableClear);
    }
    this._sort = value;
    this.dataSource.sort = this._sort;
  }

  private _sort!: MatSort;
  private _paginator!: MatPaginator;

  public formGroup = new FormGroup<{ [k: string]: FormControl }>({});
  public dataSource = new MatTableDataSource<T>([]);
  public displayedColumns: (string | keyof T)[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config']) {
      this.displayedColumns = this.config.columns.map((c) => c.columnDef);
      const formElements = this.config.columns
        .filter((c) => !!c.formElement)
        .map((c) => c.formElement);

      formElements.forEach((formElement) => {
        if (
          formElement?.elementType == 'select' ||
          formElement?.elementType == 'text' ||
          formElement?.elementType == 'date' ||
          formElement?.elementType == 'checkbox' ||
          formElement?.elementType == 'radio' ||
          formElement?.elementType == 'textarea'
        ) {
          this.formGroup.addControl(
            formElement.element.key as string,
            this.fb.control(formElement.element.value || ''),
          );
        }
      });
    }
    if (changes['data']) {
      this.dataSource = new MatTableDataSource(this.data);
    }
  }
}
