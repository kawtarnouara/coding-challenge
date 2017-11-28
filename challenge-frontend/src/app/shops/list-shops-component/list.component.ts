import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Shop } from '../models/shop';
import { Observable } from 'rxjs/Observable';
import { User } from '../../user/models/user';
import { DislikedShop } from '../models/disliked-shop';
import { UserService } from '../../user/services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'list',
    templateUrl: 'list.component.html',
})

export class ListShopComponent implements OnInit {
    shops: Shop[] = [];
    latitude;
    likedShop: Shop;
    longitude;
    disShops: Shop[] = [];
    dislikedShops: DislikedShop[] = [];
    currentUser: User = new User();
    constructor(private _shopService: ShopService, private _userService: UserService, private _router: Router) {
    }

    // get the geolocation of the current user
    setPosition(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.currentUser.email = localStorage.getItem('user');
        this.currentUser.id = localStorage.getItem('id');
        this.getSortedShops(this.latitude, this.longitude, this.currentUser.id);
    }

    ngOnInit() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        }
    }
    // get shops sorted by distance
    getSortedShops(latitude, longitude, idUser) {
        this._shopService.getSortedShops(latitude, longitude, idUser)
            .subscribe(data => {
                this.shops = data;
                for(let i = 0 ; i< this.shops.length ; i++) {
                    this.shops[i].distance = + this.shops[i].distance.toFixed(2);
                }
                // get disliked shops so they won't be included in the main page before 2 hours
                this._shopService.getDislikedShops(idUser).subscribe(dislikedShops => {
                    this.dislikedShops = dislikedShops;
                    for (let j = 0; j < this.dislikedShops.length; j++) {
                        for (let k = 0; k < this.shops.length; k++) {
                            if (this.shops[k].id === this.dislikedShops[j].shop.id) {
                                this.disShops[k] = this.shops[k];
                                this.shops.splice(k, 1);
                                const startDate = new Date();
                                // deadline= hour of dislinking + 2hours
                                const endDate = new Date(this.dislikedShops[j].deadline);
                                const seconds = (endDate.getTime() - startDate.getTime()) / 1000;
                                const milliseconds = Math.trunc(seconds) * 1000;
                                // set timeout so the disliked shop will be shown again with
                                // the nearby shops
                                setTimeout(function () {
                                    this.shops.splice(k, 0, this.disShops[k]);
                                }.bind(this), milliseconds);
                            }
                        }
                    }
                });
            });
    }

    // when liking a shop
    like($event, idShop) {
        this._shopService.getShop(idShop).subscribe(shop => {
            this.likedShop = shop;
            this.currentUser.preferredShops.push(shop);
            // add to the user's liked shops
            this._shopService.addPreferredShop(this.currentUser, shop.id).subscribe(user => {
                for (let i = 0; i < this.shops.length; i++) {
                    // remove it from the current page
                    if (this.shops[i].id === shop.id) {
                        this.shops.splice(i, 1);
                    }
                }
            });
        });
    }

    // disliking a shop
    dislike($event, idShop, i) {
        this.disShops[i] = this.shops[i];
        this.shops.splice(i, 1);
        // timeout
        setTimeout(function () {
            this.shops.splice(i, 0, this.disShops[i]);
        }.bind(this), 7200000);
        const date = new Date();
        date.setHours(date.getHours() + 2);
        this._shopService.addDislikedShop(this.currentUser, idShop, date.toISOString()).subscribe();
    }


}
