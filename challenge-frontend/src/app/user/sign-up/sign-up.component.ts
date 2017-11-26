import { Component } from '@angular/core';
import { User } from '../../user/models/user';
import { UserService } from "../services/user.service";

@Component({
    selector: 'sign-up',
    templateUrl: 'sign-up.component.html',
})

export class SignUpComponent {
    currentUser: User = new User();
    email: string;
    confirmPassword: string;
    password: string;
    existant = false;
    constructor(private _userService: UserService) {
    }

    signUp($event, email, password) {
        this.existant = false;
        this.currentUser.email = email;
        if(this.confirmPassword === password){
        this._userService.checkUser(email).subscribe(data => {
            if (data === true) {
                this.existant = true;
                this.currentUser.password = btoa(password);
                this._userService.addUser(this.currentUser).subscribe();
            }
    });
}
}
}
