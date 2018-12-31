import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private authService: AuthService,
              private router:      Router,
              private location: Location) { }
              
    canActivate(){
        if(this.authService.loggedIn()){
          //this.location.back();
          return true;
        }else{
          this.router.navigate(['login']);
          return false;
        }
    }          
}
