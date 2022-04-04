import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusDirective } from './focus.directive';

const directives = [
  FocusDirective
];

@NgModule({
  declarations: directives,
  imports: [CommonModule],
  exports: directives
})
export class DirectivesModule { }
