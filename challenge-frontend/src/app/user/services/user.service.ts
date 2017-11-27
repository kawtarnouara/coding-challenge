import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { User } from "../models/user";

@Injectable()
export class UserService {
    userUrl = 'http://localhost:8080/users';
    current : User;
    constructor(private _http: HttpClient, private _router: Router) { }

addUser(user): Observable<any> {
    return this._http.post(this.userUrl, user);
}

checkUser(email) {
    let Params = new HttpParams();
    Params = Params.append('email', email);
    return this._http.get(this.userUrl + '/check', { params: Params });
}

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

  login(user) {
     return this._http.post(this.userUrl + '/authenticate' , user);
  }

   checkCredentials(){
    if( localStorage.getItem('user') == null){
        this._router.navigate(['login']);
    }
  }

}
