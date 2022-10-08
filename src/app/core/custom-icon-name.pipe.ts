import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'customIconName'
})
export class CustomIconNamePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }

  transform(iconName: string): SafeResourceUrl {
    iconName = iconName?.replace('[', '').replace(']', '');
    const iconPath: string = `../../../../assets/images/icons/${iconName}.svg`;
    return this.domSanitizer.bypassSecurityTrustResourceUrl(iconPath);
  }

}
