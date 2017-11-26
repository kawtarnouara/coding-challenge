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
    disliked: boolean[]= [];
    currentUser: User = new User();
    constructor(private _shopService: ShopService) {
    }

    ngOnInit() {
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
                for (let j = 0 ; j < this.shops.length ; j++) {
                    this.disliked[j] = false;
                }
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
       /* this.disliked[i] = true;
        setTimeout(function() {
            this.disliked[i] = false;
        }.bind(this), 7200000);
        let date = new Date ();
        date.setHours ( date.getHours() + 2 );
        console.log(date.toISOString());*/
       }
}
