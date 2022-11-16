import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusDirective } from './focus.directive';
import { DropOverDirective } from './drop-over.directive';

const directives = [
  FocusDirective,
  DropOverDirective
];

@NgModule({
  declarations: directives,
  imports: [CommonModule],
  exports: directives
})
export class DirectivesModule { }
