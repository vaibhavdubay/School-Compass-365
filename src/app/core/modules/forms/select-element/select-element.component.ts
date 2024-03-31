import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ListOptions, Select } from '@sc-models/form';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'sc-select-element',
  templateUrl: './select-element.component.html',
  styleUrl: './select-element.component.scss',
})
export class SelectElementComponent implements AfterViewInit, OnChanges {
  @Input({ required: true }) element!: Select;
  @Input({ required: true }) control!: FormControl;

  filteredOptions!: Observable<ListOptions>;

  ngOnChanges() {
    if (this.element.disabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
    this.control.setValue(this.element.value);
  }
  ngAfterViewInit(): void {
    if (this.element.autoComplete) {
      this.filteredOptions = this.control.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || '')),
      );
    }
  }

  private _filter(value: string): ListOptions {
    const filterValue = value.toLowerCase();

    return this.element.options.filter((option) =>
      option.label.toLowerCase().includes(filterValue),
    );
  }
}
