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
    favsList: any[] = [];
    readsList: any[] = [];
    toReadsList: any[] = [];

    constructor(private _router: Router, private _userService: UserService, private _authService: AuthService) {
        this._userService.userInfo()
            .subscribe(
                data => { console.log(data); this.name(data); },
                error => this._router.navigate(['/login'])
            )
        //this.allList();
    }



    ngOnInit(): void {
        this.allList();
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
                (data:any) => {
                    console.log(data);
                    this.favsList=data.books;
                    console.log(this.favsList);
                },
                error => console.error(error))
    }

    toReadList() {
        this._userService.toReadList()
            .subscribe(
                (data:any) => {
                    console.log(data);
                    this.toReadsList=data.books;
                    console.log(this.readsList);
                },
                error => console.error(error))

    }

    readList() {
        this._userService.readList()
            .subscribe(
                (data:any) => {
                    console.log(data);
                    this.readsList=data.books;
                    console.log(this.toReadsList);
                },
                error => console.error(error))

    }

    async allList(){
        this.readList();
        this.favList();
        this.toReadList();
    }

    name(data: any) {
        this.userName = data.username;
    }

    get getName() {
        return this.userName;
    }

}
