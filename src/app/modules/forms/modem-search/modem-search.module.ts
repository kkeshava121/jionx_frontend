import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModemSearchComponent } from './modem-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ModemSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[ModemSearchComponent]
})
export class ModemSearchModule { }
