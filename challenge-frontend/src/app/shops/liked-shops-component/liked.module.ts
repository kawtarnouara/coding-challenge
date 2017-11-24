import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../services/shop.service';
import { LikedShopComponent } from './liked.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    declarations: [
        LikedShopComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
    ],
    exports: [
        LikedShopComponent
    ],
    providers: [
        ShopService
    ],

})

export class LikedShopModule {
}
