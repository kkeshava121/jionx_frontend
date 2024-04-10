import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceManagerSearchComponent } from './balance-manager-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BalanceManagerSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[BalanceManagerSearchComponent]
})
export class BalanceManagerSearchModule { }
