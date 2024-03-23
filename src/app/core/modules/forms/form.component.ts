import { Component, Input, OnChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { FormElement, InputElement } from '@sc-models/form';

@Component({
  selector: 'sc-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent<T = { [k: string]: string }> implements OnChanges {
  @Input({ required: true }) formConfig: FormElement[] = [];
  private inputElements = [
    'checkbox',
    'date',
    'radio',
    'select',
    'text',
    'textarea',
  ];

  formGroup = new FormGroup({}) as unknown as FormGroup<{
    [K in keyof T]: AbstractControl;
  }>;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(): void {
    const inputElements = this.formConfig.filter((element) =>
      this.inputElements.includes(element.elementType),
    ) as InputElement[];

    inputElements
      .map((elem) => elem.element)
      .forEach((formElement) => {
        this.formGroup.addControl(
          formElement.key as string & keyof T,
          this.fb.control(formElement.value || ''),
        );
      });
  }
}
