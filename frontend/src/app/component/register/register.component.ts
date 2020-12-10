import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    constructor(private _router: Router, private _userService: UserService) { }
    ngOnInit(): void {
    }

    registerForm: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.email, Validators.required]),
        username: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
        passwordCheck: new FormControl(null, Validators.required)
    })



    register() {
        if (!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.passwordCheck.value)) {
            console.log('Mal rempli')
            return;
        }
        this._userService.register(JSON.stringify(this.registerForm.value))
            .subscribe(
                data => {
                    console.log(data);
                    console.log('USER CREE');
                },
                error => {
                    console.log(error);
                }
            )
        console.log(JSON.stringify(this.registerForm.value));
        return;
    }


}
