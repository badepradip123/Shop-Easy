import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';


@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    FormsModule
  ],
  declarations: [ProductComponent, HomeComponent, SellerComponent],
  exports: [ProductComponent, HomeComponent, SellerComponent]
})
export class HomeModule { }
