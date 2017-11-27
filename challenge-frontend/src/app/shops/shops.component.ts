import { Component } from '@angular/core';
import { UserService } from "../user/services/user.service";

@Component({
  template:  `
  <div class="header" id="home">
  <div class="container">
      <ul>
          <li>
              <i class="fa fa-shopping-cart" aria-hidden="true"></i> 
              <a href="/shops">Nearby shops</a>
          </li>
          <li>
              <i class="fa fa-heart" aria-hidden="true"></i>
               <a href="/shops/liked">Liked shops</a>
          </li>
          <li>
          <i class="fa fa-user-circle-o" aria-hidden="true"></i>
           {{user}}
      </li>
          <li>
          <i class="fa fa-sign-out" aria-hidden="true"></i>
           <a (click)="logout()">Logout</a>
      </li>
      </ul>
  </div>
</div>
    <router-outlet></router-outlet>
  `
})
export class ShopsComponent { 
    user: string;
    constructor( private _userService: UserService) {
        this.user= localStorage.getItem('user');
    }
logout() {
    this._userService.logout();
}
}