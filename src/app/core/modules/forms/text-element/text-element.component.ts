import { AfterViewInit, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextInput } from '@sc-models/form';

@Component({
  selector: 'sc-text-element',
  templateUrl: './text-element.component.html',
  styleUrl: './text-element.component.scss',
})
export class TextElementComponent implements AfterViewInit {
  @Input({ required: true }) element!: TextInput;
  @Input({ required: true }) control!: FormControl;

  constructor() {}
  ngAfterViewInit() {
    this.control.valueChanges.subscribe((value) => {
      this.element.value = value;
    });
  }
}
