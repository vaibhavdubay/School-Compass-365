import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormElement } from '@sc-models/form';

@Component({
  selector: 'sc-form-element',
  templateUrl: './form-element.component.html',
  styleUrl: './form-element.component.scss',
})
export class FormElementComponent implements OnChanges {
  @Input({ required: true }) formElement!: FormElement;
  @Input({ required: true }) control!: FormControl;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formElement']) {
      if (this.formElement.element.disabled) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }
  }
}
