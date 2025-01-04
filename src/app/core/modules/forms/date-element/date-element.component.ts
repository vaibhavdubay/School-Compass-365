import { Component, inject, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { DateInput } from '@sc-models/form';
import { ScreenSizeObserver } from 'src/app/core/service/screen.service';

@Component({
  selector: 'sc-date-element',
  templateUrl: './date-element.component.html',
  styleUrl: './date-element.component.scss',
  standalone: false,
})
export class DateElementComponent {
  screenObserver = inject(ScreenSizeObserver);

  readonly element = input.required<DateInput>();
  readonly control = input.required<FormControl>();

  filter = (d: Date | null): boolean => {
    const element = this.element();
    return element.filteredDates?.length && d
      ? element.filteredDates?.some((date) => date.setHours(0, 0, 0, 0) === d.setHours(0, 0, 0, 0))
      : true;
  };

  dateClass: MatCalendarCellClassFunction<Date> = (d: Date, view): string => {
    let classes: string[] = [];
    const element = this.element();
    if (element.customClasses && d && view === 'month')
      classes = Object.keys(element.customClasses)
        .filter((classes) =>
          this.element().customClasses?.[classes].some((date) => date.setHours(0, 0, 0, 0) === d.setHours(0, 0, 0, 0)),
        )
        .map(([className]) => className);
    return classes.join(' ');
  };
}
