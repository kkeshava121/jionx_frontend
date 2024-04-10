import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderModule } from '@modules/header/header.module';
import { SidebarComponent } from '@modules/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HeaderModule
  ]
})
export class AdminModule { }
