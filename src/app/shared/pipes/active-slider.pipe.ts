import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

@Pipe({
  name: 'activeSlider'
})
export class ActiveSliderPipe implements PipeTransform {

  @memo()
  transform(value: boolean): string {
    return value ? 'Active' : 'Inactive';
  }

}
