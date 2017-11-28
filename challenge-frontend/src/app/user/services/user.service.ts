import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable()
export class UserService {
    userUrl = 'http://localhost:8080/users';
    current: User;
    constructor(private _http: HttpClient, private _router: Router) { }

    // sign-up
    addUser(user): Observable<any> {
        return this._http.post(this.userUrl, user);
    }

    // check if a user the same email already exists
    checkUser(email) {
        let Params = new HttpParams();
        Params = Params.append('email', email);
        return this._http.get(this.userUrl + '/check', { params: Params });
    }

    // get user by email
    getUserByEmail(email): Observable<any> {
        let Params = new HttpParams();
        Params = Params.append('email', email);
        return this._http.get(this.userUrl + '/email', { params: Params });
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        this._router.navigate(['login']);
    }

    setId(user) {
        this.getUserByEmail(user.email).subscribe(current => {
            this.current = current;
            localStorage.setItem('id', this.current.id);
        });
    }

    // check password and email
    login(user) {
        return this._http.post(this.userUrl + '/authenticate', user);
    }



}
