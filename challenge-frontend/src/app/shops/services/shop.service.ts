
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Shop } from '../models/shop';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
@Injectable()
export class ShopService {
    apiUrl = 'http://localhost:8080/shops';
    userUrl = 'http://localhost:8080/users';
    constructor(private _http: HttpClient, private router: Router) { }

    // get one shop
    getShop(id_shop): Observable<any> {
        return this._http.get(this.apiUrl + '/' + id_shop)
            .catch((e: any) => Observable.throw(this.handleError(e)));
    }

    // get shops sorted by distance
    getSortedShops(latitude, longitude, idUser): Observable<any> {
        let Params = new HttpParams();
        Params = Params.append('latitude', latitude);
        Params = Params.append('longitude', longitude);
        return this._http.get(this.apiUrl + '/location/' + idUser, { params: Params });
    }

    // used when liking a shop
    addPreferredShop(user, idShop): Observable<any> {
        return this._http.put(this.userUrl + '/liked/' + idShop, user);
    }

    // used when disliking a shop
    addDislikedShop(user, idShop, deadline): Observable<any> {
        let Params = new HttpParams();
        Params = Params.append('deadline', deadline);
        return this._http.put(this.userUrl + '/disliked/' + idShop, user, { params: Params });
    }

    // get liked shops sorted by distance
    getSortedLikedShops(latitude, longitude, idUser): Observable<any> {
        let Params = new HttpParams();
        Params = Params.append('latitude', latitude);
        Params = Params.append('longitude', longitude);
        return this._http.get(this.apiUrl + '/location/liked/' + idUser, { params: Params });
    }

    // get disliked shops
    getDislikedShops(idUser): Observable<any> {
        return this._http.get(this.userUrl + '/disliked/' + idUser);
    }

    // remove a shop from liked shops
    removeLikedShop(idShop, user): Observable<any> {
        return this._http.put(this.userUrl + '/removeLiked/' + idShop, user);
    }

    private handleError(error: Response) {
        if (error.status === 500 || error.status === 503 || error.status === 0) {
            this.router.navigate(['/500']);
        }
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }

}
