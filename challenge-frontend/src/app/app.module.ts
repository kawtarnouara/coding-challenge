import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ShopsModule } from './shops/shops.module';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './user/login/login.module';
import { SignUpModule } from './user/sign-up/sign-up.module';
import { AuthGuardLoginService } from "./user/services/auth-guard-login.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ShopsModule,
    LoginModule,
    SignUpModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuardLoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
