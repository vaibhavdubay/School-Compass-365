import { Component, inject, input, viewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { FormComponent } from '@sc-forms/form.component';
import { FormElement, DynamicListOptions } from '@sc-models/form';

@Component({
  selector: 'sc-form-array',
  standalone: false,
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.scss',
})
export class FormArrayComponent<T = { [k: string]: string }> {
  private readonly formComponents = viewChildren<FormComponent<T>>(FormComponent);
  private readonly fb = inject(FormBuilder);

  readonly formConfig = input.required<FormElement[]>();
  readonly dateFilters = input<{
    [k: string]: Date[];
  }>({});
  readonly customDateClasses = input<{
    [k: string]: {
      [className: string]: Date[];
    };
  }>({});
  readonly dynamicListOptions = input<DynamicListOptions>({});
  readonly elements: number[] = [];

  readonly formArray = this.fb.array<
    FormGroup<{
      [K in keyof T]: AbstractControl;
    }>
  >([]);

  patchValue(value: T[]) {
    this.formArray.clear();
    value.forEach((v) => {
      this.add(v);
    })
  }

  delete(index: number) {
    this.elements.splice(index, 1);
  }

  add(values?: T) {
    const last = this.elements[this.elements.length - 1] || 0;
    this.elements.push(last + 1);
    setTimeout(() => {
      this.formComponents()[last].formGroup.patchValue(values as any);
      this.formArray.push(this.formComponents()[last].formGroup)
    })
  }
}
