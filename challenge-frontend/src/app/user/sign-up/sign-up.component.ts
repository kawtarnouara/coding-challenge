import { Component } from '@angular/core';
import { User } from '../../user/models/user';
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { Md5 } from 'ts-md5/dist/md5';
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
    constructor(private _userService: UserService, private _router: Router) {
    }

    signUp($event, email, password) {
        this.existant = false;
        this.currentUser.email = email;
        // check if the password and the confirmation match
        if (this.confirmPassword === password) {
            // check if the email already exists
            this._userService.checkUser(email).subscribe(data => {
                // if it doesn't exist add the user and redirect to the shops page
                if (data === true) {
                    this.currentUser.password = Md5.hashStr(password).toString();
                    this._userService.addUser(this.currentUser).subscribe(user => {
                        localStorage.setItem('user', user.email);
                        localStorage.setItem('id', user.id);
                        this._router.navigate(['shops']);
                    });
                    // if the email exists, show error message
                } else {
                    this.existant = true;
                }
            });
        }
    }
}
