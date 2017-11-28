import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { UserService } from "./user.service";
@Injectable()
// Auth guard used for the login and sign-up
// if the users is already logged in => redirect to shops
export class AuthGuardLoginService implements CanActivate {
  userUrl = 'http://localhost:8080/users';
  constructor(private _http: HttpClient, public _router: Router, private _userService: UserService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (localStorage.getItem('user') == null) {
      return true;
    } else {
      this._router.navigate(['shops'])
      return false;
    }
  }

}
