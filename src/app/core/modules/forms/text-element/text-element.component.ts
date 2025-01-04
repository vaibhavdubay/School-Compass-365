import { Component, OnChanges, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextInput } from '@sc-models/form';

@Component({
  selector: 'sc-text-element',
  templateUrl: './text-element.component.html',
  styleUrl: './text-element.component.scss',
  standalone: false,
})
export class TextElementComponent implements OnChanges {
  readonly element = input.required<TextInput>();
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
