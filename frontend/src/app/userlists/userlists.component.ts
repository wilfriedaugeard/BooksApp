import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userlists',
  templateUrl: './userlists.component.html',
  styleUrls: ['./userlists.component.scss']
})
export class UserlistsComponent implements OnInit {

    constructor(private _router: Router, private _userService: UserService) { }

  ngOnInit(): void {
  }

}
