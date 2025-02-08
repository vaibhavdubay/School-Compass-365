import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deepCopy',
  standalone: false
})
export class DeepCopyPipe implements PipeTransform {

  deepCopy<T>(obj: T): T {
    if (typeof obj !== 'object' || obj === null) {
      return obj; // Primitive or null
    }
  
    const copy = (Array.isArray(obj) ? [] : {}) as T;
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = this.deepCopy(obj[key]); // Recursive call
      }
    }
  
    return copy;
  }

  transform<T>(value: T): T {
    return this.deepCopy(value);
  }

}
