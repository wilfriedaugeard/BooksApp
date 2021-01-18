import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from '../../service/user/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    isAuth: boolean = false;

    constructor(private _router: Router, private _userService: UserService, private _authService: AuthService) { }

    ngOnInit(): void {
        this._authService.sub(this);
        console.log('isAuth in nav: ' + this.isAuth)
        // this._authService.authenticatedBehavior
        //     .subscribe(data =>{
        //         // this.isAuth = data.authenticated;
        //         console.log("bonjour" + data);
        //     })
    }

    logout() {
        this._authService.logout()
            .subscribe(
                data => {
                    console.log(data);
                    this._authService.validateLogout();
                },
                error => console.error(error))
    }

    setIsAuth(value: boolean) {
        this.isAuth = value;
        this.ngOnInit();
    }

}
