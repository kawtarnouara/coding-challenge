import { NgModule, ViewChild, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ShopService } from './services/shop.service';
import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';
import { ListShopModule } from './list-shops-component/list.module';
import { LikedShopModule } from './liked-shops-component/liked.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        ShopsRoutingModule,
        ListShopModule,
        LikedShopModule

    ],
    declarations: [
        ShopsComponent,
    ],
    providers: [
        ShopService
    ]
})

export class ShopsModule {
}
