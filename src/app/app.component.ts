import { Component } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { NgFlashMessageService } from "ng-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shop-easy-UI';
  
  constructor(private flashMessageService: NgFlashMessageService,
              private authService: AuthService,
              private router: Router){}

  onLogoutClick(){
    this.authService.logout();
    this.flashMessageService.showFlashMessage({
      // Array of messages each will be displayed in new line
      messages: ["You are now logout"],              
      // Time after which the flash disappears defaults to 2000ms
      timeout: 3000,
      // Type of flash message, it defaults to info and success, warning, danger types can also be used
      type: 'success'
    });
    
    this.router.navigate(['/login']);
    
    return false;
  }

}