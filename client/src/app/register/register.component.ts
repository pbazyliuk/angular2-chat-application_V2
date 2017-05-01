import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';




function dateCompare(c: AbstractControl):
          {[key: string]: boolean} | null {
            let startControl = c.get('password');
            let endControl = c.get('confirmpassword');
            // if (startControl.pristine || endControl.pristine) {
            //   return null;
            // }
            if(startControl.value !== endControl.value) {
              return { 'match': true};
            }
            return null;
          }

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})


export class RegisterComponent implements OnInit {

  signUpForm: FormGroup;
  

  constructor( private fb: FormBuilder) {
  }

  // save() {
  //   console.log(this.signUpForm);
  //   console.log('Saved: ' + JSON.stringify(this.signUpForm.value));
  // }
  // onSubmit(user) {
  //   console.log(user.value, user.valid);
  // }

 ngOnInit(): void {
   this.signUpForm = this.fb.group({
        firstname: ['', [Validators.required, Validators.minLength(3)]],
        lastname: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.pattern('[^@]+@[^@]+\.[a-zA-Z]{2,}')]],
        passwords: this.fb.group({
          password: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(14)]], // 
          confirmpassword: ['', [Validators.required]]
        }, {validator: dateCompare})
    });
  }

  }
