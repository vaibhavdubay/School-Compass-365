import { AfterViewInit, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ListOptions, Select } from '@sc-models/form';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'sc-select-element',
  templateUrl: './select-element.component.html',
  styleUrl: './select-element.component.scss',
})
export class SelectElementComponent implements AfterViewInit {
  @Input({ required: true }) element!: Select;
  @Input({ required: true }) control!: FormControl;

  filteredOptions!: Observable<ListOptions>;

  ngAfterViewInit(): void {
    if (this.element.autoComplete) {
      this.filteredOptions = this.control.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || '')),
      );
    }
    this.control.valueChanges.subscribe((value) => {
      if (this.element.autoComplete) {
        this.element.value = value;
      } else {
        this.element.selectedValues = value;
      }
    });
  }

  private _filter(value: string): ListOptions {
    const filterValue = value.toLowerCase();

    return this.element.options.filter((option) =>
      option.label.toLowerCase().includes(filterValue),
    );
  }
}
