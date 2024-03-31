import { Component, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Radio } from '@sc-models/form';

@Component({
  selector: 'sc-radio-element',
  templateUrl: './radio-element.component.html',
  styleUrl: './radio-element.component.scss',
})
export class RadioElementComponent implements OnChanges {
  @Input({ required: true }) element!: Radio;
  @Input({ required: true }) control!: FormControl;

  ngOnChanges() {
    if (this.element.disabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
    this.control.setValue(this.element.value);
  }
}
