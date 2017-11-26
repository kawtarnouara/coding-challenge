import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ShopsModule } from './shops/shops.module';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { LoginModule } from './user/login/login.module';
import { SignUpModule } from './user/sign-up/sign-up.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ShopsModule,
    HomeModule,
    LoginModule,
    SignUpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
