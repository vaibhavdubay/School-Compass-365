import { Component, inject, input, OnChanges, SimpleChanges, viewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { FormComponent } from '@sc-forms/form.component';
import { FormElement, DynamicListOptions } from '@sc-models/form';

@Component({
  selector: 'sc-form-array',
  standalone: false,
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.scss',
})
export class FormArrayComponent<T = { [k: string]: string }> implements OnChanges {
  private readonly formComponents = viewChildren<FormComponent<T>>(FormComponent);
  private readonly fb = inject(FormBuilder);

  readonly formConfig = input.required<FormElement[]>();
  readonly min = input<number>(0);
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['min'] && this.min()) {
      Array.from({ length: this.min() }, (_, i) => {
        if (i >= this.elements.length) this.add();
      });
    }
  }

  patchValue(value: T[]) {
    this.formArray.clear();
    this.elements.length = 0;
    value.forEach((v) => {
      this.add(v);
    });
  }

  delete(index: number) {
    this.elements.splice(index, 1);
  }

  add(values?: T) {
    const last = this.elements[this.elements.length - 1] || 0;
    this.elements.push(last + 1);
    setTimeout(() => {
      this.formComponents()[last].formGroup.patchValue(values as any);
      this.formArray.push(this.formComponents()[last].formGroup);
    });
  }
}
