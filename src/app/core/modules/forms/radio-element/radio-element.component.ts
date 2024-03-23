import { AfterViewInit, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Radio } from '@sc-models/form';

@Component({
  selector: 'sc-radio-element',
  templateUrl: './radio-element.component.html',
  styleUrl: './radio-element.component.scss',
})
export class RadioElementComponent implements AfterViewInit {
  @Input({ required: true }) element!: Radio;
  @Input({ required: true }) control!: FormControl;
  ngAfterViewInit() {
    this.control.valueChanges.subscribe((value) => {
      this.element.value = value;
    });
  }
}
