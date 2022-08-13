import { Pipe, PipeTransform } from '@angular/core';
import { isSameDay } from 'date-fns';
import { EmployeeAttendant } from 'src/app/models/employee-attendant';
import { DateUtil } from 'src/app/utilities/date-util';

@Pipe({
  name: 'isSameDay'
})
export class IsSameDayPipe implements PipeTransform {

  transform(attendants: EmployeeAttendant[], day: Date | string): EmployeeAttendant {
    return attendants.find(attendant => {
      const dateLeft = DateUtil.clearTime(new Date(attendant.day));
      const dateRight = DateUtil.clearTime(new Date(day));
      return isSameDay(dateLeft, dateRight);
    })!;
  }

}
