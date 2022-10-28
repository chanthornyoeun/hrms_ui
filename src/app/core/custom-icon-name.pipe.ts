import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customIconName'
})
export class CustomIconNamePipe implements PipeTransform {

  transform(iconName: string): string {
    return iconName?.replace('[', '').replace(']', '');
  }

}
