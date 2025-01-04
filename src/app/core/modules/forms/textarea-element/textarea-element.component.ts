import { Component, OnChanges, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextAreaInput } from '@sc-models/form';

@Component({
  selector: 'sc-textarea-element',
  templateUrl: './textarea-element.component.html',
  styleUrl: './textarea-element.component.scss',
  standalone: false,
})
export class TextareaElementComponent implements OnChanges {
  readonly element = input.required<TextAreaInput>();
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
