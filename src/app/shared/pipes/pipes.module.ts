import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivePipe } from './active.pipe';
import { FullNamePipe } from './full-name.pipe';
import { ActiveSliderPipe } from './active-slider.pipe';
import { ExcerptPipe } from './excerpt.pipe';
import { DateFormatPipe } from "./date-format.pipe";
import { DateTimeFormatPipe } from "./date-time-format.pipe";
import { DirtyPipe } from './dirty.pipe';
import { InitialsPipe } from './initials.pipe';

const pipes = [
  ActivePipe,
  FullNamePipe,
  ActiveSliderPipe,
  ExcerptPipe,
  DateFormatPipe,
  DateTimeFormatPipe,
  DirtyPipe,
  InitialsPipe
];

@NgModule({
  declarations: pipes,
  imports: [CommonModule],
  exports: pipes,
  providers: [DatePipe]
})
export class PipesModule { }
