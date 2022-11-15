import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autoNumber'
})
export class AutoNumberPipe implements PipeTransform {

  transform(offset: number, index: number): number {
    return offset + index + 1;
  }

}
