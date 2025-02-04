import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TimeInput } from '@sc-models/form';

@Component({
  selector: 'sc-time-element',
  standalone: false,

  templateUrl: './time-element.component.html',
  styleUrl: './time-element.component.scss',
})
export class TimeElementComponent {
  readonly element = input.required<TimeInput>();
  readonly control = input.required<FormControl>();

  max: Date | null = null;
  min: Date | null = null;
  ngOnChanges() {
    const element = this.element();
    this.max = element.max ? new Date(element.max) : null;
    this.min = element.min ? new Date(element.min) : null;
    if (element.disabled) {
      this.control().disable();
    } else {
      this.control().enable();
    }
    this.control().setValue(element.value);
  }
}
