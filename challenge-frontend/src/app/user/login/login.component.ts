import { Component } from '@angular/core';
import { User } from '../../user/models/user';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
})

export class LoginComponent {
    currentUser: User = new User();
    constructor() {
    }

    login($event, email, password){
        this.currentUser.email = "email";
        this.currentUser.password = "password";
    }
}
