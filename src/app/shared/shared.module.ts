import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';



@NgModule({
  imports: [],
  exports: [
    DirectivesModule,
    PipesModule,
    ComponentsModule
  ],
  providers: []
})
export class SharedModule { }
