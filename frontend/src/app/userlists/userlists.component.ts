import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-userlists',
    templateUrl: './userlists.component.html',
    styleUrls: ['./userlists.component.scss']
})
export class UserlistsComponent implements OnInit {

    userName:String='';

    constructor(private _router: Router, private _userService: UserService) {
        this._userService.user()
        .subscribe(
            data=>{console.log(data); this.name(data);},
            error=>this._router.navigate(['/login'])
        )
    }

    ngOnInit(): void {
    }

    logout(){
        this._userService.logout()
        .subscribe(
            data=>{
                console.log(data);
                this._router.navigate(['/homepage']);
            },
            error=>console.error(error))
    }

    name(data:any){
        this.userName = data.username;
    }

}
