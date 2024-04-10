import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DataTablesModule } from 'angular-datatables';

import { PaginationModule } from '@modules/pagination/pagination.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DataTablesModule,
    FormsModule,
    PaginationModule
  ]
})
export class DashboardModule { }
