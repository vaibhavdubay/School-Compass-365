import { Component, OnChanges, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Checkbox } from '@sc-models/form';

@Component({
  selector: 'sc-checkbox-element',
  templateUrl: './checkbox-element.component.html',
  styleUrl: './checkbox-element.component.scss',
  standalone: false,
})
export class CheckboxElementComponent implements OnChanges {
  readonly element = input.required<Checkbox>();
  readonly control = input.required<FormControl>();
  constructor() {}

  ngOnChanges() {
    const element = this.element();
    if (element.disabled) {
      this.control().disable();
    } else {
      this.control().enable();
    }
    this.control().setValue(element.value);
  }
}
