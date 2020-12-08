import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }
  
  registerForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.email, Validators.required]),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordCheck: new FormControl(null, Validators.required)
  })
  
  register(){
    if(!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.passwordCheck.value))
      console.log('Mal rempli')
    else
      console.log(JSON.stringify(this.registerForm.value));
  }


}
