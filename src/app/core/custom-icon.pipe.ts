import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customIcon'
})
export class CustomIconPipe implements PipeTransform {

  private pattern = new RegExp(/\[.*?\]/g);

  transform(iconName: string): boolean {
    return this.pattern.test(iconName);
  }

}
