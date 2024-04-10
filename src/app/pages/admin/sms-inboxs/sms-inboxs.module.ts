import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SmsInboxsRoutingModule } from './sms-inboxs-routing.module';
import { B2bComponent } from './b2b/b2b.component';
import { SmsInboxsComponent } from './sms-inboxs.component';
import { DataTablesModule } from 'angular-datatables';
import { CashInComponent } from './cash-in/cash-in.component';
import { CashOutComponent } from './cash-out/cash-out.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationModule } from '@modules/pagination/pagination.module';
import { SmsInboxSearchModule } from '@modules/forms/sms-inbox-search/sms-inbox-search.module';

@NgModule({
  declarations: [SmsInboxsComponent, CashInComponent, CashOutComponent,B2bComponent],
  imports: [
    CommonModule,
    SmsInboxsRoutingModule,
    DataTablesModule,
    FormsModule,
    NgxPaginationModule,
    PaginationModule,
    ReactiveFormsModule,
    SmsInboxSearchModule
  ]
})
export class SmsInboxsModule { }
