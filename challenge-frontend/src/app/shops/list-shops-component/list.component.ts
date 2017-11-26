import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Shop } from '../models/shop';
import { Observable } from 'rxjs/Observable';
import { User } from '../../user/models/user';
import { DislikedShop } from "../models/disliked-shop";

@Component({
    selector: 'list',
    templateUrl: 'list.component.html',
})

export class ListShopComponent implements OnInit {
    shops: Shop[] = [];
    latitude: string;
    likedShop: Shop;
    longitude: string;
    disShops: Shop[] = [];
    dislikedShops: DislikedShop[] = [];
    currentUser: User = new User();
    constructor(private _shopService: ShopService) {
    }

    ngOnInit() {
        var startDate = new Date();
        // Do your operations
        var endDate   = new Date('2017-11-16T00:00:00');
        var seconds = (-endDate.getTime() + startDate.getTime()) / 1000;
        console.log(seconds);
        console.log(Math.trunc(22.45));
        this.currentUser.email = 'kawtar.nouara@gmail.com';
        this.currentUser.id = '56e352ef-85e8-40ba-a804-fa5bae06069d';
        this.currentUser.password = 'test';
        this.currentUser.preferredShops = [];
        this.currentUser.preferredShops.push({
                'id': '5a0c6748fb3aac66aafe26de',
                'picture': 'http://placehold.it/150x150',
                'name': 'Teraprene',
                'email': 'leilaware@teraprene.com',
                'city': 'Rabat',
                'location': {
                    'type': 'Point',
                    'coordinates': [
                        -6.84167,
                        33.81279
                    ]
                },
                'distance': 0,
        });
        this._shopService.getCurrentIpLocation().subscribe(result => {
            this.latitude = result.loc.split(',')[0];
            this.longitude = result.loc.split(',')[1];
            console.log(this.latitude + " " + this.longitude);
            this.getSortedShops(this.latitude, this.longitude, this.currentUser.id);
        });
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
