import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../services/shop.service';
import { ListShopComponent } from './list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../user/services/user.service';
@NgModule({
    declarations: [
        ListShopComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
    ],
    exports: [
        ListShopComponent
    ],
    providers: [
        ShopService,
        UserService
    ],

})

export class ListShopModule {
}
