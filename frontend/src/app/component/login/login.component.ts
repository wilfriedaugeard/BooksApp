import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from '../../service/user/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private _router: Router, private _userService: UserService, private _authService: AuthService) { }
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
        this._authService.login(JSON.stringify(this.loginForm.value))
            .subscribe(
                data => {
                    this._authService.validateLogin();
                    console.log(this._authService.isAuth);
                    this._router.navigate(['/userlists']);
                },
                error => {
                    console.log(error);
                }
            )
        return;
    }

}
