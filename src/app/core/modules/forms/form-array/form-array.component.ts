import { Component, inject, input, model, OnChanges, SimpleChanges, viewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { FormComponent } from '@sc-forms/form.component';
import { FormElement, DynamicListOptions } from '@sc-models/form';

type FormGroupObj<T> = FormGroup<{
  [K in keyof T]: AbstractControl;
}>;
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
  readonly max = input<number>(5);
  readonly showAdd = model<boolean>(true);
  readonly dateFilters = input<{
    [k: string]: Date[];
  }>({});
  readonly customDateClasses = input<{
    [k: string]: {
      [className: string]: Date[];
    };
  }>({});
  readonly dynamicListOptions = input<DynamicListOptions>({});

  readonly formArraySignal = input(this.fb.array<FormGroupObj<T>>([]));

  private hadShowAdd = false;

  get formArray() {
    return this.formArraySignal();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['min'] && this.min()) {
      Array.from({ length: this.min() }, (_, i) => {
        if (i >= this.formArray.value.length) this.add();
      });
    }
  }

  patchValue(value: T[]) {
    this.formArray.clear();
    value.forEach((v) => {
      this.add(v);
    });
  }

  delete(index: number) {
    this.formArray.controls.splice(index, 1);
    if(this.formArray.controls.length < this.max() && (this.hadShowAdd)) {
      this.showAdd.set(true);
    }
  }

  add(values?: T) {
    this.formArray.push(this.fb.group({}) as unknown as FormGroupObj<T>);
    setTimeout(() => {
      if(this.formArray.controls.length == this.max()) {
        this.showAdd.set(false);
        this.hadShowAdd = true
      }
    });
  }
}
