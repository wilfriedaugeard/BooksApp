import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuth: boolean = false;

  constructor(private _router: Router, private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.sub(this);
    console.log('isAuth in nav: '+this.isAuth)
  }

  logout() {
    this._userService.logout()
      .subscribe(
        data => {
          console.log(data);
          this._userService.validateLogout();
          this._router.navigate(['/homepage']);
        },
        error => console.error(error))
  }

  setIsAuth(value: boolean){
    this.isAuth = value;
    this.ngOnInit();
  }

}
