import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModemRoutingModule } from './modem-routing.module';
import { ModemComponent } from './modem.component';
import { DataTablesModule } from 'angular-datatables';
import { PaginationModule } from '@modules/pagination/pagination.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModemSearchModule } from '@modules/forms/modem-search/modem-search.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddComponent } from './add/add.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'

@NgModule({
  declarations: [
    ModemComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    ModemRoutingModule,
    DataTablesModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ModemSearchModule,
    NgxPaginationModule,
    SelectDropDownModule
  ]
})
export class ModemModule { }
