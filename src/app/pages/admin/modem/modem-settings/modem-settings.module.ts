import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModemSettingsRoutingModule } from './modem-settings-routing.module';
import { ModemSettingsComponent } from './modem-settings.component';
import { DataTablesModule } from 'angular-datatables';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModemSettingsComponent
  ],
  imports: [
    CommonModule,
    ModemSettingsRoutingModule,
    DataTablesModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ModemSettingsModule { }
