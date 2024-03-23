import { AfterViewInit, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Checkbox } from '@sc-models/form';

@Component({
  selector: 'sc-checkbox-element',
  templateUrl: './checkbox-element.component.html',
  styleUrl: './checkbox-element.component.scss',
})
export class CheckboxElementComponent implements AfterViewInit {
  @Input({ required: true }) element!: Checkbox;
  @Input({ required: true }) control!: FormControl;
  constructor() {}
  ngAfterViewInit() {
    this.control.valueChanges.subscribe((value) => {
      this.element.value = value;
    });
  }
}
