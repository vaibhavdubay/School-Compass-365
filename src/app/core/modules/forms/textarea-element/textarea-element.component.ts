import { AfterViewInit, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextAreaInput } from '@sc-models/form';

@Component({
  selector: 'sc-textarea-element',
  templateUrl: './textarea-element.component.html',
  styleUrl: './textarea-element.component.scss',
})
export class TextareaElementComponent implements AfterViewInit {
  @Input({ required: true }) element!: TextAreaInput;
  @Input({ required: true }) control!: FormControl;

  constructor() {}
  ngAfterViewInit() {
    this.control.valueChanges.subscribe((value) => {
      this.element.value = value;
    });
  }
}
