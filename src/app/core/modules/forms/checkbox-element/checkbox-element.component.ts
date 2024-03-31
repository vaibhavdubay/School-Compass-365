import { Component, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Checkbox } from '@sc-models/form';

@Component({
  selector: 'sc-checkbox-element',
  templateUrl: './checkbox-element.component.html',
  styleUrl: './checkbox-element.component.scss',
})
export class CheckboxElementComponent implements OnChanges {
  @Input({ required: true }) element!: Checkbox;
  @Input({ required: true }) control!: FormControl;
  constructor() {}

  ngOnChanges() {
    if (this.element.disabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
    this.control.setValue(this.element.value);
  }
}
