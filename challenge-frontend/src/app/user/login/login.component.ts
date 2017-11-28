import { Component, OnInit } from '@angular/core';
import { User } from '../../user/models/user';
import { UserService } from '../services/user.service';
import { Router } from "@angular/router";
import {Md5} from 'ts-md5/dist/md5';
@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
})

export class LoginComponent implements OnInit {
    currentUser: User = new User();
    errorMsg = '';
    errorLogin = false ;
    constructor(private userService: UserService , private _router: Router) {
    }

    ngOnInit() {
    }

    login($event, email, password){
        this.currentUser.password=Md5.hashStr(password).toString();
        this.userService.setId(this.currentUser);
        // check the email and the password
        this.userService.login(this.currentUser).subscribe(data =>{
            // if they r correct
            if (data) {
                localStorage.setItem('user', this.currentUser.email);
                this._router.navigate(['shops']);
                // if they are not
            } else { 
                this.errorLogin = true;
                this.errorMsg = 'Wrong email or password !'; }
        });
    }
}
