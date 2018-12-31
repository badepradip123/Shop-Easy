import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { ValidateService } from "../../services/validate.service";
import { Router } from "@angular/router";
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  name: String;
  email: String;
  password: String;
  phone: number;
  type: string;
  address: string;
  showLogin: boolean = true;
  

  constructor( private authService:  AuthService,
               private flashMessageService: NgFlashMessageService,
               private validateService: ValidateService,
               private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      phone: this.phone,
      type: this.type,
      address: this.address
    }

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessageService.showFlashMessage({
        messages: ["Please filled all fileds"], 
        timeout: 3000  ,
        type: 'danger'
      });
      return false;      
    } 

    // Required email in proper format
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessageService.showFlashMessage({
        messages: ["Please Enter validate email"],
        timeout: 3000,
        type: 'danger'
      });
      return false;      
    }


    this.authService.registerUser(user).subscribe(data => {      
      if(data.success){
        this.showLogin = true;
        this.flashMessageService.showFlashMessage({
          messages: ["You are registered and can login in"],
          timeout: 3000,
          type: 'success'
        });
        this.router.navigate(['/login']);
      }else{    
        this.flashMessageService.showFlashMessage({
          messages: ["Something Went Wrong"],
          timeout: 3000,
          type: 'success'
        });
        this.router.navigate(['/register']);
      }
    });

  }

  onLoginSubmit(){
    const user  = {
      username: this.username,
      password: this.password
    }
    this.authService.authenticateUser(user).subscribe( data => {
      if (data.success) {
          this.authService.storeUserData(data.token,data.user);

        this.flashMessageService.showFlashMessage({
          messages: ["You are now loggedin"], 
          timeout: 3000,
          type: 'success'
        });
        
        if(data.user.type.trim() == 'S')
        {
          //console.log('seller navigation  '+data.user.type);          
          this.router.navigate(['/seller', data.user.id])
        }
        else{ 
          //console.log('home navigation  '+data.user.type);        
          this.router.navigate(['/']);
        }
      } else {
        this.flashMessageService.showFlashMessage({         
          messages: [data.msg],               
          timeout: 3000,          
          type: 'danger'
        });
        this.router.navigate(['/login'])        
      }
    })
  }
}
