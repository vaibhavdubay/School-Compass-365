import { Component, OnChanges, SimpleChanges, ViewChild, inject, input, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableConfig } from '@sc-models/table';

@Component({
  selector: 'sc-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: false,
})
export class TableComponent<T = { [k: string]: string }> implements OnChanges {
  private readonly fb = inject(FormBuilder);

  readonly config = input<TableConfig<T>>({ columns: [] });
  readonly data = input<T[]>([]);

  readonly buttonClick = output<{ key: string; row: T }>();

  @ViewChild(MatPaginator, { static: true }) public get paginator(): MatPaginator {
    return this._paginator;
  }
  public set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
    this._paginator = value;
  }

  @ViewChild(MatSort, { static: true })
  public get sort(): MatSort {
    return this._sort;
  }
  public set sort(value: MatSort) {
    const sort = this.config().sort;
    value.disabled = !sort;
    if (sort && !this._sort) {
      sort.column && (value.active = sort.column as string);
      sort.direction && (value.direction = sort.direction);
      sort.disableClear && (value.disableClear = sort.disableClear);
    }
    this._sort = value;
    this.dataSource.sort = this._sort;
  }

  private _sort!: MatSort;
  private _paginator!: MatPaginator;

  public filterForm = new FormGroup({
    search: new FormControl(),
  });
  public formGroup = new FormGroup<{ [k: string]: FormControl }>({});
  public dataSource = new MatTableDataSource<T>(this.data() || []);
  public displayedColumns: (string | keyof T)[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config']) {
      this.displayedColumns = this.config().columns.map((c) => c.columnDef);
      const formElements = this.config()
        .columns.filter((c) => !!c.formElement)
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
          this.formGroup.addControl(formElement.element.key, this.fb.control(formElement.element.value ?? ''));
        }
      });
    }
    if (changes['data']) {
      this.dataSource.data = this.data();
    }
  }
}
