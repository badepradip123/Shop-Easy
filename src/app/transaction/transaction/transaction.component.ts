import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import * as jsPDF  from 'jspdf';
import { Router } from "@angular/router";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  @ViewChild('content') content: ElementRef;

  constructor(private router: Router) { }

  ngOnInit() {
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
