import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { CustomIconPipe } from './custom-icon.pipe';
import { CustomIconNamePipe } from './custom-icon-name.pipe';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MaterialCompModule } from '../shared/material-comp/material-comp.module';



@NgModule({
  declarations: [
    AuthLayoutComponent,
    AdminLayoutComponent,
    NavigationComponent,
    HeaderComponent,
    MenuComponent,
    CustomIconPipe,
    CustomIconNamePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialCompModule,
    PerfectScrollbarModule
  ]
})
export class CoreModule { }
