import { Component, input, output } from '@angular/core';
import { Button } from '@sc-models/form';

@Component({
  selector: 'sc-button-element',
  templateUrl: './button-element.component.html',
  styleUrl: './button-element.component.scss',
  standalone: false,
})
export class ButtonElementComponent {
  readonly element = input.required<Button>();
  readonly clicked = output();
}
