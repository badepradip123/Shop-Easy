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

  getProduct(page){
    let headers = new Headers();
    // console.log('--------------'+this.authToken+'--------');
    this.loadToken();    
    headers.append('Authorization',this.authToken);
    return this.http.get(environment.apiBaseUrl+'/product?page='+page,{headers: headers})
    .pipe(
      map( res => res.json())
    );
  }  

  getProductBySellerId(id){
    let headers = new Headers();    
    this.loadToken();    
    headers.append('Authorization',this.authToken);
    return this.http.get(environment.apiBaseUrl+'/product/seller/'+id,{headers: headers})
    .pipe(
      map( res => res.json())
    );
  }  

  getProductById(product_id){
    let headers = new Headers();    
    this.loadToken();    
    headers.append('Authorization',this.authToken);
    return this.http.get(environment.apiBaseUrl+'/product/'+product_id,{headers: headers})
    .pipe(
      map( res => res.json())
    );
  } 

  addProduct(product){
    let headers = new Headers();
    this.loadToken();
    //console.log('>>>>>>>>>>>>>>'+this.user.id+'<<<<<<<<<<<<<<<<<');
    return this.http.post(environment.apiBaseUrl+'/product/add', product, {headers: headers})
    .pipe(
      map( res => res.json())
    );
  }

  confirmTransaction(product, user){
    console.log('>>>>>>>>>>>>>>>>>>',product,user);
    let headers = new Headers();
    this.loadToken();    
    headers.append('Authorization',this.authToken);
    return this.http.post(environment.apiBaseUrl+'/product/transaction', {'user': user, 'product': product}, {headers: headers})
    .pipe(
      map( res => res.json())
    );
  }

  loadToken(){          
    this.authToken = localStorage.getItem('id_token');
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
