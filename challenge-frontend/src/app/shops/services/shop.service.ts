
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Shop } from '../models/shop';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RequestOptions } from "@angular/http";
@Injectable()
export class ShopService {
    apiUrl = 'http://localhost:8080/shops';
    userUrl = 'http://localhost:8080/users';
    constructor(private _http: HttpClient) { }

    // get all shops
    getShops(): Observable<any> {
        return this._http.get(this.apiUrl);
    }
    // get one shop
    getShop(id_shop): Observable<any>{
        return this._http.get(this.apiUrl + '/' + id_shop);
    }

    getSortedShops(latitude, longitude): Observable<any> {
        let Params = new HttpParams();
        Params = Params.append('latitude', latitude);
        Params = Params.append('longitude', longitude);
        return this._http.get(this.apiUrl + '/location', { params: Params });
    }

    addPreferredShop(email, idShop) {
        let Params = new HttpParams();
        Params = Params.append('email', email);
        Params = Params.append('idShop', idShop);
        return this._http.get(this.userUrl + '/preferredShops', { params: Params });
    }

    getCurrentIpLocation(): Observable<any> {
        return this._http.get('http://ipinfo.io');
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }


}