import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";
import {ActivatedRoute} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
// import { Product } from "../home/product";

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
    price: string;
    model: string;
    features: string;
    images: Array<File> = [];
    count: number=0;
    seller_id: number; 
    products: any; 
    add: boolean = false;

  constructor( private productService:  ProductService,
               private flashMessageService: NgFlashMessageService,
               private route:ActivatedRoute,
               private router: Router) { }

  ngOnInit() { 
    this.route.params.subscribe( params =>
      this.seller_id = params['id']
    );
    this.productService.getProductById(this.seller_id)
      .subscribe(products => 
        this.products = products);     
}
  fileChangeEvent(fileInput: any) {
    this.images = fileInput.target.files;
  }
  onProductAdd(){
    this.productService.loadToken();
    
    const formData: any = new FormData();
    const files: Array<File> = this.images;    
    formData.append('price', this.price);
    formData.append('model', this.model);
    formData.append('count', this.count);
    formData.append('features', this.features);
    formData.append('seller_id', this.productService.user.id);
    for(let i =0; i < files.length; i++){
        formData.append("uploads[]", files[i], files[i]['name']);
    }    
    
    this.productService.addProduct(formData).subscribe(data => {
      if(data.success){       
        this.flashMessageService.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: ["You added product"],              
          // Time after which the flash disappears defaults to 2000ms
          timeout: 3000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'success'
        });
        this.add = false;
        this.productService.getProductById(this.seller_id)
        .subscribe(products => this.products = products);
      }else{    
        this.flashMessageService.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: ["Something Went Wrong"],              
          // Time after which the flash disappears defaults to 2000ms
          timeout: 3000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'danger'
        });
        //this.router.navigate(['/seller', this.seller_id]);
      }
    });
  }
  showaddForm() {
    this.add = true;
  }
}
