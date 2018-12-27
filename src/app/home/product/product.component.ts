import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from "../../services/product.service";
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
  
  constructor(private productService: ProductService) { }

  ngOnInit() {
    if(this.product.features){
      this.features = this.product.features.split(",")
    }  
  }
  

}
