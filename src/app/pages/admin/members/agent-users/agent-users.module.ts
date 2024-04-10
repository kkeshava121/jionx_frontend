import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentUsersRoutingModule } from './agent-users-routing.module';
import { AgentUsersComponent } from './agent-users.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from '@modules/pagination/pagination.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AgentUsersComponent
  ],
  imports: [
    CommonModule,
    AgentUsersRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    NgbModule
  ]
})
export class AgentUsersModule { }
