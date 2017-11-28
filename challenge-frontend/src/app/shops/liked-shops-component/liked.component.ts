import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Shop } from '../models/shop';
import { Observable } from 'rxjs/Observable';
import { User } from '../../user/models/user';
import { UserService } from '../../user/services/user.service';

@Component({
    selector: 'liked',
    templateUrl: 'liked.component.html',
})

export class LikedShopComponent implements OnInit {
    shops: Shop[] = [];
    noLiked = false; // if no liked shop
    latitude: string;
    likedShop: Shop;
    longitude: string;
    currentUser: User = new User();
    constructor(private _shopService: ShopService, private _userService: UserService) {
    }

    // get current user position
    setPosition(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.currentUser.email = localStorage.getItem('user');
        this.currentUser.id = localStorage.getItem('id');
        this.getSortedLikedShops(this.latitude, this.longitude, this.currentUser.id);
    }

    ngOnInit() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        }
    }

    // get the liked shops sorted by distance
    getSortedLikedShops(latitude, longitude, idUser) {
        this._shopService.getSortedLikedShops(latitude, longitude, idUser)
            .subscribe(data => {
                this.shops = data;
                // if no liked shop, a message will be displayed
                if (this.shops.length === 0) {
                    this.noLiked = true;
                }
                // format the distance
                for (let i = 0; i < this.shops.length; i++) {
                    this.shops[i].distance = + this.shops[i].distance.toFixed(2);
                }
            });
    }

    // remove a shop from the liked shops
    remove($event, idShop) {
        this._shopService.removeLikedShop(idShop, this.currentUser).subscribe(user => {
            for (let i = 0; i < this.shops.length; i++) {
                // remove the shop from the current page
                if (this.shops[i].id === idShop) {
                    this.shops.splice(i, 1);
                    // if no liked shop, a message will be displayed
                    if (this.shops.length === 0) {
                        this.noLiked = true;
                    }
                }
            }
        });
    }



}
