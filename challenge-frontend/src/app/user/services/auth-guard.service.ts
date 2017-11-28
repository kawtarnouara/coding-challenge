import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { UserService } from "./user.service";
@Injectable()
export class AuthGuardService implements CanActivate {
    // Auth guard used for the nearby and liked shops
    // if the users is not logged in => redirect to login
    userUrl = 'http://localhost:8080/users';
    constructor(private _http: HttpClient, public _router: Router, private _userService: UserService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('user') == null) {
            this._router.navigate(['login']);
            return false;
        } else {
            return true;
        }
    }
}