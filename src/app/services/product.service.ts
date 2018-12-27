import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "../../environments/environment";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  authToken: any;
  user: any;

  constructor(private http: Http,
    public helper: JwtHelperService) { }

  getProduct(){
    let headers = new Headers();
    // console.log('--------------'+this.authToken+'--------');
    this.loadToken();    
    headers.append('Authorization',this.authToken);
    return this.http.get(environment.apiBaseUrl+'/product',{headers: headers})
    .pipe(
      map( res => res.json())
    );
  }  

  getProductById(id){
    let headers = new Headers();    
    this.loadToken();    
    headers.append('Authorization',this.authToken);
    return this.http.get(environment.apiBaseUrl+'/product/'+id,{headers: headers})
    .pipe(
      map( res => res.json())
    );
  }  

  addProduct(product){
    let headers = new Headers();
    this.loadToken();
    console.log('>>>>>>>>>>>>>>'+this.user.id+'<<<<<<<<<<<<<<<<<');
    // headers.append('Content-Type','application/json');
    return this.http.post(environment.apiBaseUrl+'/product/add', product, {headers: headers})
    .pipe(
      map( res => res.json())
    );
  }

  loadToken(){          
    this.authToken = localStorage.getItem('id_token');
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
