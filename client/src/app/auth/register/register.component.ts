import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Register } from './register.model';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service'



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


export class RegisterComponent implements OnInit, OnDestroy {

  private profile: Register = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: ''
  };


  private subscriptions: Subscription[] = [];

  signUpForm: FormGroup;

  constructor( private fb: FormBuilder, private LoginService: LoginService, private router: Router, private zone: NgZone) {
  }

  private signUpSubmit(form: any) {
     
     const data = {
      firstname: this.signUpForm.value.firstname,
      lastname: this.signUpForm.value.lastname,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.passwords.password
      // confirmpassword: this.signUpForm.value.passwords.confirmpassword
     };

     console.log(data);

     this.subscriptions.push(
       this.LoginService
         .register(data)
         .subscribe(this.onLoginSuccess.bind(this), this.onLoginError)
      )
   }

  onLoginError (err){
    console.error(err);
    alert('Something goes wrong')
  }

  onLoginSuccess (res: any): void {
     console.log(res);
     this.LoginService.setUserState(res);
     this.router.navigate(['chat']);
  }

  // save() {
  //   console.log(this.signUpForm.value)
  // }
  
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

  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }

  }
