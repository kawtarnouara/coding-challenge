
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Shop } from '../models/shop';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
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
    getShop(id_shop): Observable<any> {
        return this._http.get(this.apiUrl + '/' + id_shop);
    }

    getSortedShops(latitude, longitude, idUser): Observable<any> {
        let Params = new HttpParams();
        Params = Params.append('latitude', latitude);
        Params = Params.append('longitude', longitude);
        return this._http.get(this.apiUrl + '/location/' + idUser, { params: Params });
    }

    addPreferredShop(user, idShop): Observable<any> {
        return this._http.put(this.userUrl + '/liked/' + idShop , user);
    }

    getCurrentIpLocation(): Observable<any> {
        return this._http.get('http://ipinfo.io');
    }

    getSortedLikedShops(latitude, longitude, idUser): Observable<any> {
        let Params = new HttpParams();
        Params = Params.append('latitude', latitude);
        Params = Params.append('longitude', longitude);
        return this._http.get(this.apiUrl + '/location/liked/' + idUser, { params: Params });
    }

    removeLikedShop(idShop , user): Observable<any> {
        return this._http.put(this.userUrl + '/removeLiked/' + idShop , user);
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }

}