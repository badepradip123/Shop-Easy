import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService) { }
  products = [] ;
  p: number = 1;
  pageCount=0;
  ngOnInit() {
    this.productService.getProduct(this.p).subscribe(products =>{
      this.products = products.data;
      this.pageCount = products.pagecount;
    })
      }  

    pageChange(page){
      this.p = page;
      this.productService.getProduct(this.p).subscribe((products) =>{
      this.products = products.data;
      this.pageCount = products.pagecount;      
    })
    
          
    } 

  }
  
