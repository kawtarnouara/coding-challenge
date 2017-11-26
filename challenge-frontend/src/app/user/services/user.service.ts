import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    userUrl = 'http://localhost:8080/users';

    constructor(private _http: HttpClient) { }

addUser(user): Observable<any> {
    return this._http.post(this.userUrl, user);
}

checkUser(email) {
    let Params = new HttpParams();
    Params = Params.append('email', email);
    return this._http.get(this.userUrl + '/check', { params: Params });
}
}
