import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivePipe } from './active.pipe';
import { FullNamePipe } from './full-name.pipe';
import { ActiveSliderPipe } from './active-slider.pipe';
import { ExcerptPipe } from './excerpt.pipe';

const pipes = [
  ActivePipe,
  FullNamePipe,
  ActiveSliderPipe,
  ExcerptPipe
];

@NgModule({
  declarations: pipes,
  imports: [CommonModule],
  exports: pipes
})
export class PipesModule { }
