import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateInput } from '@sc-models/form';

@Component({
  selector: 'sc-date-element',
  templateUrl: './date-element.component.html',
  styleUrl: './date-element.component.scss',
})
export class DateElementComponent {
  @Input({ required: true }) element!: DateInput;
  @Input({ required: true }) control!: FormControl;
}
