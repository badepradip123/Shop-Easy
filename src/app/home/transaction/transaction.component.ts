import { Component, OnInit, ViewChild, ElementRef, Input  } from '@angular/core';
import * as jsPDF  from 'jspdf';
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";
import {ActivatedRoute} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Product } from "../home/product";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
   today = new Date();
   product_id: number; 
   product: Product;
   status: boolean = false;
  
    user : any;

  @ViewChild('content') content: ElementRef;

  constructor(private productService:  ProductService,
              private flashMessageService: NgFlashMessageService,
              private route:ActivatedRoute,
              private router: Router) { }

   ngOnInit() {
    this.route.params.subscribe( params =>
      this.product_id = params['product_id']
    );
    this.user = JSON.parse(localStorage.getItem('user'));
    this.productService.getProductById(this.product_id)
      .subscribe(product => 
        this.product = product[0]);
   }

  onConfirm(product_id,user_id) {
    this.productService.confirmTransaction(product_id, user_id)
      .subscribe(res => {
        if(res.status)  {   
          this.flashMessageService.showFlashMessage({           
            messages: ["You will get your product shortly"],           
            timeout: 3000,           
            type: 'success'
          });
          this.status = res.status;
        }else{    
          this.flashMessageService.showFlashMessage({
            messages: ["Something Went Wrong"],              
            timeout: 3000,
            type: 'danger'
          });
          this.status = res.status;
          //this.router.navigate(['/seller', this.seller_id]);
        }
      });
    
      
  }
  public downloadPDF(){
   
    const doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

      let content = this.content.nativeElement;

      doc.fromHTML(content.innerHTML, 15, 15, {
        'width': 190,
        'elementHandlers': specialElementHandlers
      });

      doc.save('test.pdf');     
    
  }

  

}
