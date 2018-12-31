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
  user:any;
  
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

  goHome(){
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user){

      if(this.user.type.trim() == 'S')
          {
            //console.log('seller navigation  '+data.user.type);          
            this.router.navigate(['/seller', this.user.id])
          }
          else{ 
            //console.log('home navigation  '+data.user.type);        
            this.router.navigate(['/']);
          }
     }
     else{
      //  console.log('hellloer');
      this.router.navigate(['/']);
     }
   } 
  

}