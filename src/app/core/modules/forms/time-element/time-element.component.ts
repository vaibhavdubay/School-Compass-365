import { Component, input } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { TimeInput } from '@sc-models/form';

@Component({
  selector: 'sc-time-element',
  standalone: false,

  templateUrl: './time-element.component.html',
  styleUrl: './time-element.component.scss',
})
export class TimeElementComponent {
  readonly element = input.required<TimeInput>();
  readonly control = input.required<FormControl>();

  changesEndTime() {
    if (this.element().type == 'endTime') {
      this.control().addValidators(this.endTimeValidator());
      this.control().updateValueAndValidity();
    }

    // Watch for startTime changes and revalidate endTime
    this.control()
      .parent?.get('breakStartTime')
      ?.valueChanges.subscribe(() => {
        this.control().updateValueAndValidity();
      });
  }
  endTimeValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.parent || !control.parent.get('breakStartTime')) return null;

      const startTime = control.parent.get('breakStartTime')?.value;
      const endTime = control.value;

      console.log('Start Time:', startTime, 'End Time:', endTime); // Debugging

      if (!startTime || !endTime) return null;

      const startDate = this.convertToDate(startTime);
      const endDate = this.convertToDate(endTime);

      if (startDate && endDate && endDate <= startDate) {
        return { invalidEndTime: true };
      }
      return null;
    };
  }

  // Helper function to convert time string (HH:mm) to Date object
  private convertToDate(time: string | Date): Date | null {
    if (!time) return null;

    if (time instanceof Date) return time; // If already a Date, return as is

    const [hours, minutes] = time.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return null; // Invalid time format

    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Set hours and minutes

    return date;
  }
}
