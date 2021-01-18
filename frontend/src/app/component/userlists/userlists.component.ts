import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from '../../service/user/user.service';

@Component({
    selector: 'app-userlists',
    templateUrl: './userlists.component.html',
    styleUrls: ['./userlists.component.scss']
})
export class UserlistsComponent implements OnInit {

    userName: String = '';
    welcomeMessage = '';

    constructor(private _router: Router, private _userService: UserService, private _authService: AuthService) {
        this._userService.userInfo()
            .subscribe(
                data => { console.log(data); this.name(data); },
                error => this._router.navigate(['/login'])
            )
    }



    ngOnInit(): void {
    }

    logout() {
        this._authService.logout()
            .subscribe(
                data => {
                    console.log(data);
                    this._router.navigate(['/homepage']);
                },
                error => console.error(error))
    }

    favList() {
        this._userService.favList()
            .subscribe(
                data => {
                    console.log(data);
                },
                error => console.error(error))
    }

    toReadList() {
        this._userService.toReadList()
            .subscribe(
                data => {
                    console.log(data);
                },
                error => console.error(error))

    }

    readList() {
        this._userService.readList()
            .subscribe(
                data => {
                    console.log(data);
                },
                error => console.error(error))

    }

    name(data: any) {
        this.userName = data.username;
    }

    get getName() {
        return this.userName;
    }

}
