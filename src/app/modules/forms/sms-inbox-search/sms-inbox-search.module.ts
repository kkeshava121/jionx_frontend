import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsInboxSearchComponent } from './sms-inbox-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SmsInboxSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[SmsInboxSearchComponent]
})
export class SmsInboxSearchModule { }
