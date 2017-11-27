import { Component, OnInit } from '@angular/core';
import { User } from '../../user/models/user';
import { UserService } from '../services/user.service';
import { Router } from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
})

export class LoginComponent implements OnInit {
    currentUser: User = new User();
    errorMsg = '';
    constructor(private userService: UserService , private _router: Router) {
    }

    ngOnInit() {
    }
    login($event, email, password){
        this.userService.setId(this.currentUser);
        this.userService.login(this.currentUser).subscribe(data =>{
            if (data) {
                localStorage.setItem('user', this.currentUser.email);
                this._router.navigate(['shops']);
            } else { this.errorMsg = 'Failed to login'; }
        });
    }
}
