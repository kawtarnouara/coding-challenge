import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Shop } from '../models/shop';
import { Observable } from 'rxjs/Observable';
import { User } from '../../user/models/user';

@Component({
    selector: 'list',
    templateUrl: 'list.component.html',
})

export class ListShopComponent implements OnInit {
    shops: Shop[] = [];
    latitude: string;
    likedShop: Shop;
    longitude: string;
    currentUser: User = new User();
    constructor(private _shopService: ShopService) {
    }

    ngOnInit() {
        this.currentUser.email = "kawtar.nouara@gmail.com";
        this.currentUser.password = "test";
        this._shopService.getCurrentIpLocation().subscribe(result => {
            this.latitude = result.loc.split(',')[0];
            this.longitude = result.loc.split(',')[1];
            this.getSortedShops(this.latitude, this.longitude);
        });
    }
    getSortedShops(latitude, longitude) {
        this._shopService.getSortedShops(latitude, longitude)
            .subscribe(data => {
                this.shops = data;
            });
    }

    like($event, idShop) {
        this._shopService.getShop(idShop).subscribe(shop => {
            this.likedShop = shop;
            this._shopService.addPreferredShop(this.currentUser.email,  this.likedShop.id).subscribe();
            for (let i = 0; i < this.shops.length; i++) {
                if (this.shops[i].id === shop.id) {
                    this.shops.splice(i, 1);
                }
            }
        });
    }
}
