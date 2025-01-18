import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, computed, inject, input, model } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Chip, ListOptions } from '@sc-models/form';

@Component({
  selector: 'sc-chip-element',
  standalone: false,

  templateUrl: './chip-element.component.html',
  styleUrl: './chip-element.component.scss',
})
export class ChipElementComponent {
  private readonly announcer = inject(LiveAnnouncer);
  readonly keywords = model<string[]>([]);
  readonly element = input.required<Chip>();
  readonly control = input.required<FormControl>();
  readonly options = input.required<ListOptions>();

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentChip = model('');
  readonly filteredFruits = computed(() => {
    const currentFruit = this.currentChip().toLowerCase();
    return currentFruit
      ? this.options().filter(fruit => fruit.label.toLowerCase().includes(currentFruit))
      : this.options().slice();
  });
  removeKeyword(keyword: string) {
    this.keywords.update((keywords) => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword}`);
      return [...keywords];
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.keywords.update((keywords) => [...keywords, value]);
    }
    event.chipInput!.clear();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.keywords.update(keyword => [...keyword, event.option.viewValue]);
    this.currentChip.set('');
    event.option.deselect();
  }
}
