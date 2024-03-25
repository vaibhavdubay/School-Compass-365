import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormElement } from '@sc-models/form';

@Component({
  selector: 'sc-form-element',
  templateUrl: './form-element.component.html',
  styleUrl: './form-element.component.scss',
})
export class FormElementComponent {
  @Input({ required: true }) formElement!: FormElement;
  @Input({ required: true }) control!: FormControl;
}
