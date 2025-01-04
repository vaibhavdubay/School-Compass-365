import { Component, input } from '@angular/core';
import { Label } from '@sc-models/form';

@Component({
  selector: 'sc-label-element',
  templateUrl: './label-element.component.html',
  styleUrl: './label-element.component.scss',
  standalone: false,
})
export class LabelElementComponent {
  readonly element = input.required<Label>();
}
