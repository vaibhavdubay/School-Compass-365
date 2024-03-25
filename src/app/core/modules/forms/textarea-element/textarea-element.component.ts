import { Component, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextAreaInput } from '@sc-models/form';

@Component({
  selector: 'sc-textarea-element',
  templateUrl: './textarea-element.component.html',
  styleUrl: './textarea-element.component.scss',
})
export class TextareaElementComponent implements OnChanges {
  @Input({ required: true }) element!: TextAreaInput;
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
