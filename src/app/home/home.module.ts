import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { TransactionComponent } from "./transaction/transaction.component";
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [ProductComponent, HomeComponent, SellerComponent,TransactionComponent],
  exports: [ProductComponent, HomeComponent, SellerComponent,TransactionComponent]
})
export class HomeModule { }
