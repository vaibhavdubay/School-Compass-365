import { Component, Input, input } from '@angular/core';
import { errorMessages } from '@sc-forms/form.constant';
import { Checkbox, DateInput, Radio, Select, TextAreaInput, TextInput } from '@sc-models/form';

@Component({
  selector: 'sc-error',
  templateUrl: './error.component.html',
  styles: ``,
  standalone: false,
})
export class ErrorComponent {
  readonly element = input.required<Checkbox | DateInput | Radio | Select | TextInput | TextAreaInput>();
  readonly minLength = input<number>();
  readonly min = input<number>();
  readonly max = input<number>();
  readonly errorMessages = input<{
    [key: string]: string;
  }>({});
  @Input({ required: true }) set errors(errors: { [k: string]: string } | null) {
    Object.keys(errors || {}).forEach((error) => {
      switch (error) {
        case 'required':
          this.message = errorMessages.required(this.element()?.label ?? '');
          break;
        case 'minLength':
          this.message = errorMessages.minlength(this.element().label ?? '', this.minLength() ?? 0);
          break;
        case 'pattern':
          this.message =
            (this.element() as TextInput).validateAs == 'email' ? errorMessages.email : errorMessages.pattern;
          break;
        case 'email':
          this.message = errorMessages.email;
          break;
        case 'min':
          this.message = errorMessages.min(this.element().label ?? '', this.min() ?? 0);
          break;
        case 'max':
          this.message = errorMessages.max(this.element().label ?? '', this.max() ?? 0);
          break;
        case 'matDatepickerMin':
          this.message = errorMessages.matDatepickerMin;
          break;
        case 'matDatepickerMax':
          this.message = errorMessages.matDatepickerMax;
          break;
        case 'mustMatch':
          this.message = errorMessages.mustMatch;
          break;
        case 'matTimepickerParse':
          this.message = errorMessages.matTimepickerParse;
          break;
        case 'matTimepickerMin':
          this.message = errorMessages.matTimepickerMin;
          break;
        case 'matTimepickerMax':
          this.message = errorMessages.matTimepickerMax;
          break;
      }
      const errorMessagesValue = this.errorMessages();
      if (errorMessagesValue[error]) {
        this.message = errorMessagesValue[error];
      }
    });
  }

  message: string = '';
}
