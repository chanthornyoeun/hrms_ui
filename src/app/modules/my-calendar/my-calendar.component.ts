import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { finalize } from 'rxjs';
import { CalendarFilter } from 'src/app/models/calendar-filter';
import { DateRange } from 'src/app/models/date-range';
import { CalendarService } from 'src/app/services/calendar.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { DateUtil } from 'src/app/utilities/date-util';
import { ParamsBuilder } from 'src/app/utilities/params-builder';

const colors: Record<string, { primary: string, secondary: string }> = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
    }
};

enum EventType {
    BIRTHDAY = 'BIRTHDAY',
    ATTENDANCE = 'ATTENDANCE'
}

@Component({
    selector: 'app-my-calendar',
    templateUrl: './my-calendar.component.html',
    styleUrls: ['./my-calendar.component.scss']
})
export class MyCalendarComponent implements OnInit {

    view: CalendarView = CalendarView.Month;
    viewDate = new Date();
    events: CalendarEvent[] = [];
    EventType = EventType;
    dateRange: DateRange = {
        fromDate: DateUtil.getFirstDayOfCurrentMonth(),
        toDate: DateUtil.getLastDayOfCurrentMonth()
    };
    options!: CalendarFilter;

    constructor(
        private calendarService: CalendarService,
        private loaderService: LoaderService
    ) { }

    ngOnInit(): void {

    }

    private getEvents(dateRange: DateRange, options?: any) {
        this.loaderService.show();
        this.calendarService.getEvents(dateRange, ParamsBuilder.build(options))
            .pipe(finalize(() => this.loaderService.hide()))
            .subscribe(res => {
                const data = res.data as any[];
                this.events = [];
                data.forEach(d => {
                    const event: any = {
                        start: new Date(d.day),
                        color: colors['yellow'],
                        title: this.getTitle(d),
                        birthdays: d.birthdays,
                        holidays: d.holidays,
                        leaveRequests: d.leaveRequests,
                        isWeekend: d.isWeekend,
                    }
                    if (d.isAttend !== null || d.isAttend !== undefined) {
                        event.isAttend = d.isAttend
                    };

                    this.events.push(event);
                });
            });
    }

    private getTitle(event: any): string {
        if (event.isWeekend) {
            return 'Weekend';
        }

        return event.isAttend ? 'Attend' : 'Not Preset';
    }

    onOptionChange(options: CalendarFilter) {
        this.getEvents(this.dateRange, options);
        this.options = options;
    }

    changeMonth(date: Date) {
        this.dateRange = {
            fromDate: DateUtil.getFirstDayOfDate(date),
            toDate: DateUtil.getLastDayOfDate(date)
        };
        this.getEvents(this.dateRange, this.options);
    }

}
