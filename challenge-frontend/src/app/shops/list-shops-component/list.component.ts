import { Component } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Shop } from '../models/shop';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'list',
    templateUrl: 'list.component.html',
})

export class ListShopComponent {
    shops: Shop[]= [];
    constructor(private _shopService: ShopService) {
    }

    ngOnInit() {
        this.getShops();
    }

    getShops() {
        this._shopService.getShops()
        .subscribe(data => {
            console.log(data);
            this.shops = data;
    });
}
}
