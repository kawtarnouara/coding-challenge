
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Shop } from '../models/shop';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ShopService {
    apiUrl = 'http://localhost:8080/shops';

    constructor(private _http: HttpClient) { }

    // get all shops
    getShops(): Observable<any>  {
        return this._http.get(this.apiUrl);
    }
    // get one shop
    getShop(id_shop) {
        return this._http.get(this.apiUrl + '/' + id_shop);
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }


}