import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantsRoutingModule } from './merchants-routing.module';
import { MerchantsComponent } from './merchants.component';
import { PaginationModule } from '@modules/pagination/pagination.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MerchantsComponent
  ],
  imports: [
    CommonModule,
    MerchantsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule
  ]
})
export class MerchantsModule { }
