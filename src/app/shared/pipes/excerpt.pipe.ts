import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerpt'
})
export class ExcerptPipe implements PipeTransform {

  private DEFAULT_LENGTH = 100;

  transform(text: string, length?: number): string {
    if (!text) {
      return '';
    }
    
    length = length ? length : this.DEFAULT_LENGTH;
    return text.length <= length ? text : text.substring(0, length) + '...';
  }

}
