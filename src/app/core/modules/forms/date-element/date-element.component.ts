import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { DateInput } from '@sc-models/form';
import { ScreenSizeObserver } from 'src/app/core/service/screen.service';

@Component({
  selector: 'sc-date-element',
  templateUrl: './date-element.component.html',
  styleUrl: './date-element.component.scss',
})
export class DateElementComponent {
  @Input({ required: true }) element!: DateInput;
  @Input({ required: true }) control!: FormControl;
  constructor(public screenObserver: ScreenSizeObserver) {}

  filter = (d: Date | null): boolean => {
    return this.element.filteredDates?.length && d
      ? this.element.filteredDates?.some(
          (date) => date.setHours(0, 0, 0, 0) === d.setHours(0, 0, 0, 0),
        )
      : true;
  };

  dateClass: MatCalendarCellClassFunction<Date> = (d: Date, view): string => {
    let classes: string[] = [];
    if (this.element.customClasses && d && view === 'month')
      classes = Object.keys(this.element.customClasses)
        .filter((classes) =>
          this.element.customClasses?.[classes].some(
            (date) => date.setHours(0, 0, 0, 0) === d.setHours(0, 0, 0, 0),
          ),
        )
        .map(([className]) => className);
    return classes.join(' ');
  };
}
