import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { ShopsModule } from './shops/shops.module';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './user/login/login.module';
import { SignUpModule } from './user/sign-up/sign-up.module';
import { AuthGuardLoginService } from "./user/services/auth-guard-login.service";
import { NotFoundPageModule } from "./404/404.module";
import { ErroPageModule } from "./500/500.module";
import { GlobalErrorHandler } from "./error-handler";


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
    AppRoutingModule,
    ErroPageModule,
    NotFoundPageModule
  ],
  providers: [
    AuthGuardLoginService, // to verify if the user is authenticated => redirect to shops
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
