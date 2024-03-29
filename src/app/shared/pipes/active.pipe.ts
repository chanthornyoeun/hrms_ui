import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'active'
})
export class ActivePipe implements PipeTransform {

  transform(value: number): string {
    return value === 1 || value ? 'YES' : 'NO';
  }

}
