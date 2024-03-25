import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ButtonElement, FormElement } from '@sc-models/form';

@Component({
  selector: 'sc-form-element',
  templateUrl: './form-element.component.html',
  styleUrl: './form-element.component.scss',
})
export class FormElementComponent {
  @Input({ required: true }) formElement!: FormElement;
  @Input({ required: true }) control!: FormControl;
  @Output() btnClick = new EventEmitter<{
    key: string;
    element: ButtonElement;
  }>();
}
