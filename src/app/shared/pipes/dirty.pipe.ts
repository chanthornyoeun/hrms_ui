import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dirty'
})
export class DirtyPipe implements PipeTransform {

  transform(oldValue: any, newValue: any): boolean {
    return JSON.stringify(oldValue) !== JSON.stringify(newValue);
  }

}
