import { Component } from '@angular/core';
import { User } from '../../user/models/user';

@Component({
    selector: 'sign-up',
    templateUrl: 'sign-up.component.html',
})

export class SignUpComponent {
    currentUser: User = new User();
    constructor() {
    }

    login($event, email, password){
        this.currentUser.email = "email";
        this.currentUser.password = "password";
    }
}
