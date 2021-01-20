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

    loginForm: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, [Validators.required])
    });

    error = false;

    constructor(private _router: Router,
        private _userService: UserService,
        private _authService: AuthService) { }

    ngOnInit(): void {
    }

    login() {
        if (!this.loginForm.valid) {
            console.log('Mal rempli');
            const alertDialog = document.getElementById('formAlert');
            if (alertDialog) { alertDialog.style.display = 'block'; }
        }
        this._authService.login(JSON.stringify(this.loginForm.value))
            .subscribe(
                data => {
                    this._authService.validateLogin();
                    console.log(this._authService.isAuth);
                    this._router.navigate(['/userlists']);
                },
                error => {
                    console.log(error);
                    const alertDialog = document.getElementById('formAlert');
                    if (alertDialog) { alertDialog.style.display = 'block';}
                }
            )
        return;
    }

}
 