import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { FormsModule } from '@angular/forms';
import { HomeModule } from "./home/home.module";
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { LoginModule } from "./login/login.module";
//import { PaginationModule } from 'ngx-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './/app-routing.module';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CarouselModule.forRoot(),
    NgFlashMessagesModule.forRoot(),
    HttpModule, 
    AppRoutingModule,
    NgxPaginationModule,
    //PaginationModule.forRoot(),
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
  exports: [NgxPaginationModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
