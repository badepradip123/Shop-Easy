import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "../../environments/environment";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http,
              public helper: JwtHelperService) { }

  getProduct(){
    let headers = new Headers();
    // console.log('--------------'+this.authToken+'--------');    
    headers.append('Authorization',this.authToken);
    return this.http.get(environment.apiBaseUrl+'/users/product',{headers: headers})
    .pipe(
      map( res => res.json())
    );
  }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(environment.apiBaseUrl+'/users/register', user, {headers: headers})
    .pipe(
      map( res => res.json())
    );
  } 

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(environment.apiBaseUrl+'/users/authenticate', user, {headers: headers})
    .pipe(
      map( res => res.json())
    );
  }

  storeUserData(token,user){
      localStorage.setItem('id_token',token);
      localStorage.setItem('user',JSON.stringify(user));      
      this.authToken = token;
      this.user = user;
     
      //console.log('----------------'+this.user.username+'--------------');
  }

  loggedIn(){
    //console.log(this.helper.isTokenExpired( localStorage.getItem('id_token')));    
    return !this.helper.isTokenExpired( localStorage.getItem('id_token'));
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
