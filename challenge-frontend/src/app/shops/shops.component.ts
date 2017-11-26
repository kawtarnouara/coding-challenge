import { Component } from '@angular/core';

@Component({
  template:  `
  <div class="header" id="home">
  <div class="container">
      <ul>
          <li></li>
          <li>
              <i class="fa fa-shopping-cart" aria-hidden="true"></i> 
              <a href="/shops">Nearby shops</a>
          </li>
          <li>
              <i class="fa fa-heart" aria-hidden="true"></i>
               <a href="/shops/liked">Liked shops</a>
          </li>
          <li>
          <i class="fa fa-sign-out" aria-hidden="true"></i>
           <a href="/logout">Logout</a>
      </li>
      </ul>
  </div>
</div>
    <router-outlet></router-outlet>
  `
})
export class ShopsComponent { }
