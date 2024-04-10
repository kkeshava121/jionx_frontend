import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PinCodeRoutingModule } from './pin-code-routing.module';
import { PinCodeComponent } from './pin-code.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PinCodeComponent
  ],
  imports: [
    CommonModule,
    PinCodeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PinCodeModule { }
