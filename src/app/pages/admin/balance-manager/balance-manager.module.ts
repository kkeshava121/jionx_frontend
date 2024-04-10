import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalanceManagerRoutingModule } from './balance-manager-routing.module';
import { BalanceManagerComponent } from './balance-manager.component';
import { DataTablesModule } from 'angular-datatables';
import { PaginationModule } from '@modules/pagination/pagination.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FakeComponent } from './fake/fake.component';
import { PendingsComponent } from './pendings/pendings.component';
import { RejectedComponent } from './rejected/rejected.component';
import { SuccessComponent } from './success/success.component';
import { ApprovedComponent } from './approved/approved.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DangerComponent } from './danger/danger.component';
import { UserFormModule } from '@modules/forms/user-form/user-form.module';
import { BalanceManagerSearchModule } from '@modules/forms/balance-manager-search/balance-manager-search.module';


@NgModule({
  declarations: [BalanceManagerComponent,FakeComponent,PendingsComponent,RejectedComponent,SuccessComponent,ApprovedComponent,DangerComponent],
  imports: [
    CommonModule,
    BalanceManagerRoutingModule,
    DataTablesModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BalanceManagerSearchModule
  ]
})
export class BalanceManagerModule { }
