import { Component, input } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
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
}
