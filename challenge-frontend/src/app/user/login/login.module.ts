import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
    ],
    exports: [
        LoginComponent
    ],
    providers: [
        UserService
    ],

})

export class LoginModule {
}
