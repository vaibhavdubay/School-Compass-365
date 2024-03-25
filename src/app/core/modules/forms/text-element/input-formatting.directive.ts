import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { InputValidators } from '@sc-models/form';

@Directive({
  selector: 'input[scFormatting]',
})
export class InputFormattingDirective {
  @Input('scFormatting') set formatAs(val: InputValidators) {
    this.numberFormatting = ['currency', 'number', 'decimal'].includes(val);
    this.currency = val === 'currency';
    this.numberOnly = val === 'number';
    this.hasPattern = val === 'pattern';
  }
  @Input()
  public set pattern(value: string | RegExp) {
    if (value) this._pattern = value;
  }
  public get pattern(): string | RegExp {
    return this._pattern;
  }
  private _pattern: string | RegExp = /\D*/g;
  private numberFormatting = false;
  private currency = false;
  private numberOnly = true;
  private hasPattern = false;
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onKeyDown(event: InputEvent) {
    const initialValue: string = this.el.nativeElement.value;
    const formattedValue: string = this.numberFormatting
      ? this.handleNumberInput(initialValue)
      : this.hasPattern
      ? initialValue.replace(this.pattern, '')
      : initialValue;
    if (initialValue !== formattedValue) {
      this.el.nativeElement.value = formattedValue;
      event.stopPropagation();
    }
  }

  private handleNumberInput(initialValue: string): string {
    const getNumbers = (d: string) => d.replace(this.pattern || '', '');
    let formattedValue = '';
    if (this.numberOnly) {
      formattedValue = getNumbers(initialValue);
    } else {
      const [integer, ...decimals] = initialValue.split('.').map(getNumbers);
      const dataAfterDecimal = decimals.join('');
      formattedValue = integer;
      formattedValue += decimals.length
        ? `.${this.currency ? dataAfterDecimal.slice(0, 2) : dataAfterDecimal}`
        : '';
    }
    return formattedValue;
  }
}
