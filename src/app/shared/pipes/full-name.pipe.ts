import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: any, ...keys: string[]): string {
    let name = '';
    keys.forEach(key => name += value[key] + ' ');
    return name.trim();
  }

}
