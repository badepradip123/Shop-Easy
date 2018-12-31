import { Component, OnInit, Input } from '@angular/core';
import { Product } from "../home/product";
import { environment } from "../../../environments/environment";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  features:any;
  path = environment.apiBaseUrl;
  buy: boolean = false;
  user: any = {};
  
  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.product.features){
      this.features = this.product.features.split(",")
    }  
  }

  buyNow(){
    this.buy = true;
    //console.log('buy value',this.buy);
  }
  

}
