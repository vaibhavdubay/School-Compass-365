import { Component, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextInput } from '@sc-models/form';

@Component({
  selector: 'sc-text-element',
  templateUrl: './text-element.component.html',
  styleUrl: './text-element.component.scss',
})
export class TextElementComponent implements OnChanges {
  @Input({ required: true }) element!: TextInput;
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
