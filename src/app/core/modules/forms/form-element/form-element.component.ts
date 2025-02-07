import { Component, input, output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Button, DynamicListOptions, FormElement } from '@sc-models/form';

@Component({
  selector: 'sc-form-element',
  templateUrl: './form-element.component.html',
  styleUrl: './form-element.component.scss',
  standalone: false,
})
export class FormElementComponent {
  readonly formElement = input.required<FormElement>();
  readonly control = input.required<FormControl>();
  readonly dynamicListOptions = input<DynamicListOptions>({});
  readonly btnClick = output<{
    key: string;
    element: Button;
  }>();
}
