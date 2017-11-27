import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Shop } from '../models/shop';
import { Observable } from 'rxjs/Observable';
import { User } from '../../user/models/user';
import { DislikedShop } from "../models/disliked-shop";
import { UserService } from "../../user/services/user.service";
import { Router } from "@angular/router";

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
    constructor(private _shopService: ShopService , private _userService: UserService , private _router: Router) {
    }
    setPosition(position){
        console.log(position.coords);
        this.latitude= position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.currentUser.email = localStorage.getItem('user');
        this.currentUser.id = localStorage.getItem('id');
        this.getSortedShops(this.latitude, this.longitude, this.currentUser.id);
        }

    ngOnInit() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
            }
       
    }
    getSortedShops(latitude, longitude, idUser) {
        this._shopService.getSortedShops(latitude, longitude, idUser)
            .subscribe(data => {
                this.shops = data;
                this._shopService.getDislikedShops(idUser).subscribe(dislikedShops => {
                    this.dislikedShops = dislikedShops;
                    for (let j = 0; j < this.dislikedShops.length; j++) {
                       for (let k = 0 ; k < this.shops.length ; k++) {
                          if (this.shops[k].id === this.dislikedShops[j].shop.id ) {
                            this.disShops[k] = this.shops[k];
                            this.shops.splice(k, 1);
                            let startDate = new Date();
                            let endDate = new Date(this.dislikedShops[j].deadline);
                            let seconds = (endDate.getTime() - startDate.getTime()) / 1000;
                            let milliseconds = Math.trunc(seconds) * 1000;
                            setTimeout(function() {
                                this.shops.splice(k, 0, this.disShops[k]);
                            }.bind(this), milliseconds);
                            }
                        }
                 }
                 });
            });
    }

    like($event, idShop) {
        this._shopService.getShop(idShop).subscribe(shop => {
            this.likedShop = shop;
            this.currentUser.preferredShops.push(shop);
            this._shopService.addPreferredShop(this.currentUser , shop.id).subscribe(user => {
            for (let i = 0; i < this.shops.length; i++) {
                if (this.shops[i].id === shop.id) {
                    this.shops.splice(i, 1);
                }
            }
        });
        });
    }

    dislike($event, idShop, i) {
        const date = new Date ();
        date.setHours ( date.getHours() + 2 );
         this._shopService.addDislikedShop(this.currentUser, idShop, date.toISOString()).subscribe();
       }

      
}
