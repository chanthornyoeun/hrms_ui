import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyAttendantRoutingModule } from './daily-attendant-routing.module';
import { DailyAttendantComponent } from './daily-attendant.component';
import { PaginationHistoryService } from "../../services/pagination-history.service";
import { MaterialCompModule } from 'src/app/shared/material-comp/material-comp.module';
import { DateAdapter } from 'angular-calendar';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { SelectCompsModule } from 'src/app/shared/select-comps/select-comps.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IsSameDayPipe } from './is-same-day.pipe';
import { QrCodeGeneratorComponent } from './qr-code-generator/qr-code-generator.component';

export const DATE_FORMAT = {
  display: {
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

export const DATEPICKER_PROVIDER = [
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  {
    provide: MAT_DATE_FORMATS,
    useValue: DATE_FORMAT
  }
]


@NgModule({
  declarations: [
    DailyAttendantComponent,
    IsSameDayPipe,
    QrCodeGeneratorComponent,
  ],
  imports: [
    CommonModule,
    DailyAttendantRoutingModule,
    ReactiveFormsModule,
    SelectCompsModule,
    ComponentsModule,
    MaterialCompModule,
  ],
  providers: [
    PaginationHistoryService,
    DATEPICKER_PROVIDER
  ]
})
export class DailyAttendantModule { }
