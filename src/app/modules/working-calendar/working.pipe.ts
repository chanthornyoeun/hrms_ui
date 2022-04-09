import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

@Pipe({
  name: 'working'
})
export class WorkingPipe implements PipeTransform {

  @memo()
  transform(isWorking: boolean): any {
    return isWorking ? 'Working' : 'Not working';
  }

}
