import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required])
  })

  login(){
    if(!this.loginForm.valid)
      console.log('Mal rempli')
    else
      console.log(JSON.stringify(this.loginForm.value));
  }

}
