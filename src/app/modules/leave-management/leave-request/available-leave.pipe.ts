import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'availableLeave'
})
export class AvailableLeavePipe implements PipeTransform {

  transform(leaveBalance: number, appliedDays: number): unknown {
    return leaveBalance - appliedDays;
  }

}
