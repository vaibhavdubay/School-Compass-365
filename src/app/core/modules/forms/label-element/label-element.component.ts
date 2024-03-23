import { Component, Input } from '@angular/core';
import { Label } from '@sc-models/form';

@Component({
  selector: 'sc-label-element',
  templateUrl: './label-element.component.html',
  styleUrl: './label-element.component.scss',
})
export class LabelElementComponent {
  @Input({ required: true }) element!: Label;
}
