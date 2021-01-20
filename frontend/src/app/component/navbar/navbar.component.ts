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

    isAuth = false;

    constructor(private _router: Router,
                private _userService: UserService,
                private _authService: AuthService) { }

    ngOnInit(): void {
        this._authService.sub(this);
        console.log('isAuth in nav: ' + this.isAuth)
    }

    logout(): void {
        this._authService.logout()
            .subscribe(
                data => {
                    console.log(data);
                    this._authService.validateLogout();
                },
                error => console.error(error))
    }

    setIsAuth(value: boolean): void {
        this.isAuth = value;
        this.ngOnInit();
    }

}
