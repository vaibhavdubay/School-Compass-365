import { Component, OnChanges, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Radio } from '@sc-models/form';

@Component({
  selector: 'sc-radio-element',
  templateUrl: './radio-element.component.html',
  styleUrl: './radio-element.component.scss',
  standalone: false,
})
export class RadioElementComponent implements OnChanges {
  readonly element = input.required<Radio>();
  readonly control = input.required<FormControl>();

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
