import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { FormsModule } from '@angular/forms';
import { HomeModule } from "./home/home.module";
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { LoginModule } from "./login/login.module";

import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CarouselModule.forRoot(),
    NgFlashMessagesModule.forRoot(),
    HttpModule, 
    AppRoutingModule,
    
    HomeModule,
    LoginModule,
    JwtModule.forRoot({
      config: {
        // ...
        tokenGetter: () => {
          return  localStorage.getItem('id_token');
        }
      }
    }),
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
