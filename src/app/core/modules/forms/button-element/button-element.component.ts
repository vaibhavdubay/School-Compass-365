import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '@sc-models/form';

@Component({
  selector: 'sc-button-element',
  templateUrl: './button-element.component.html',
  styleUrl: './button-element.component.scss',
})
export class ButtonElementComponent {
  @Input({ required: true }) element!: Button;
  @Output() clicked: EventEmitter<void> = new EventEmitter();
}
