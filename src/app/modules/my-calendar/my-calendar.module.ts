import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCalendarRoutingModule } from './my-calendar-routing.module';
import { MyCalendarComponent } from './my-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FilterOptionComponent } from './filter-option/filter-option.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialCompModule } from 'src/app/shared/material-comp/material-comp.module';
import { ComponentsModule } from './../../shared/components/components.module';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    MyCalendarComponent,
    FilterOptionComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    MyCalendarRoutingModule,
    ReactiveFormsModule,
    MaterialCompModule,
    ComponentsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ]
})
export class MyCalendarModule { }
