import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Shop } from '../models/shop';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'list',
    templateUrl: 'list.component.html',
})

export class ListShopComponent implements OnInit {
    shops: Shop[] = [];
    latitude: string;
    longitude: string;
    constructor(private _shopService: ShopService) {
    }

    ngOnInit() {
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
}
