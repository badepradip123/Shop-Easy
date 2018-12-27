import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TransactionComponent } from './transaction/transaction.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [TransactionComponent],
  exports: [TransactionComponent]
})
export class TransactionModule { }
