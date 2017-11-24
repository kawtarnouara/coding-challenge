import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Shop } from '../models/shop';
import { Observable } from 'rxjs/Observable';
import { User } from '../../user/models/user';

@Component({
    selector: 'liked',
    templateUrl: 'liked.component.html',
})

export class LikedShopComponent implements OnInit {
    shops: Shop[] = [];
    latitude: string;
    likedShop: Shop;
    longitude: string;
    currentUser: User = new User();
    constructor(private _shopService: ShopService) {
    }

    ngOnInit() {
        this.currentUser.email = 'kawtar.nouara@gmail.com';
        this.currentUser.id = '56e352ef-85e8-40ba-a804-fa5bae06069d';
        this.currentUser.password = 'test';
        this.currentUser.preferredShops = [];
        this._shopService.getCurrentIpLocation().subscribe(result => {
            this.latitude = result.loc.split(',')[0];
            this.longitude = result.loc.split(',')[1];
            this.getSortedLikedShops(this.latitude, this.longitude, this.currentUser.id);
        });
    }

    getSortedLikedShops(latitude, longitude, idUser) {
        this._shopService.getSortedLikedShops(latitude, longitude, idUser)
            .subscribe(data => {
                this.shops = data;
            });
    }

    remove($event, idShop) {
        this._shopService.removeLikedShop(idShop, this.currentUser).subscribe(user => {
            for (let i = 0; i < this.shops.length; i++) {
                if (this.shops[i].id === idShop) {
                    this.shops.splice(i, 1);
                }
            }
        });
    }

}
