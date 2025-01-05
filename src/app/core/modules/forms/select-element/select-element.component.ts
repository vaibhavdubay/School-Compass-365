import { AfterViewInit, Component, OnChanges, SimpleChanges, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ListOptions, Select } from '@sc-models/form';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'sc-select-element',
  templateUrl: './select-element.component.html',
  styleUrl: './select-element.component.scss',
  standalone: false,
})
export class SelectElementComponent implements AfterViewInit, OnChanges {
  readonly element = input.required<Select>();
  readonly options = input.required<ListOptions>();
  readonly control = input.required<FormControl>();

  filteredOptions!: Observable<ListOptions>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['element'] || changes['control']) {
      const element = this.element();
      if (element.disabled) {
        this.control().disable();
      } else {
        this.control().enable();
      }
      this.control().setValue(element.value);
    }
  }
  ngAfterViewInit(): void {
    if (this.element().autoComplete) {
      this.filteredOptions = this.control().valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || '')),
      );
    }
  }
  capitalizeWords(str: string) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private _filter(value: string): ListOptions {
    const filterValue = value.toLowerCase();

    return this.options().filter((option) => option.label.toLowerCase().includes(filterValue));
  }
}
