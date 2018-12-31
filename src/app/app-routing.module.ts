import { NgModule, Component } from '@angular/core';
import { HomeComponent } from "./home/home/home.component";
import { ProductComponent } from "./home/product/product.component";
import { LoginComponent } from "./login/login/login.component";
import { SellerComponent } from "./home/seller/seller.component";
import { TransactionComponent } from "./home/transaction/transaction.component"
import { RouterModule, Routes } from "@angular/router";
import { AuthguardService } from "./AuthGuard/authguard.service";

const appRoutes: Routes = [
    
    { path: 'products', component: ProductComponent       },
    { path: 'login',    component: LoginComponent         },
    { path: 'seller/:id',    component: SellerComponent       },
    { path: 'trans/:product_id',    component: TransactionComponent,canActivate: [AuthguardService]  },
    { path: '**',         component: HomeComponent          }

]

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
