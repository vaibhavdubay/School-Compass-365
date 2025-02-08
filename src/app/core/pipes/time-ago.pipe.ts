import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'timeAgo',
  standalone: false
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: any): string {
    if (!value) return '';

    const date = moment(value);

    // If the date is today, display 'Today' or relative time
    if (date.isSame(moment(), 'day')) {
      return date.fromNow(); // e.g., "1 hour ago", "10 minutes ago"
    }

    // If the date was yesterday
    if (date.isSame(moment().subtract(1, 'day'), 'day')) {
      return 'Yesterday';
    }

    // Otherwise, return the full date in dd/mm/yyyy format
    return date.format('DD/MM/YYYY');
  }

}
