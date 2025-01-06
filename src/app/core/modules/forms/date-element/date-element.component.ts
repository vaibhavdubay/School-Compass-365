import { Component, inject, input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { DateInput } from '@sc-models/form';
import { ScreenSizeObserver } from 'src/app/core/service/screen.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'sc-date-element',
  templateUrl: './date-element.component.html',
  styleUrl: './date-element.component.scss',
  standalone: false,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class DateElementComponent implements OnChanges {
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
  max: Date | null = null
  min: Date | null = null
  ngOnChanges() {
    const element = this.element();
    this.max = element.max? new Date(element.max) : null;
    this.min = element.min? new Date(element.min) : null;
    if (element.disabled) {
      this.control().disable();
    } else {
      this.control().enable();
    }
    this.control().setValue(element.value);
  }
}
