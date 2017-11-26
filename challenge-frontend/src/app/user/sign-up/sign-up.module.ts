import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
@NgModule({
    declarations: [
        SignUpComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
    ],
    exports: [
        SignUpComponent
    ],
    providers: [
        UserService
    ],

})

export class SignUpModule {
}
