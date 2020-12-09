import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private _router: Router, private _userService: UserService) { }
    ngOnInit(): void {
    }

    loginForm: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, [Validators.required])
    })

    login() {
        if (!this.loginForm.valid) {
            console.log('Mal rempli')
            return;
        }
        //console.log(JSON.stringify(this.loginForm.value));
        this._userService.login(JSON.stringify(this.loginForm.value))
            .subscribe(
                data => {
                    console.log(data);
                    console.log('USER CONNECTE');
                    this._router.navigate(['/userlists'])
                },
                error => {
                    console.log(error);
                }
            )
        return;
    }

}
