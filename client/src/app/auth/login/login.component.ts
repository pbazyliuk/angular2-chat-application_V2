import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { User } from './login.model';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  private user: User = {
    email: '',
    password: ''
  };


  private subscriptions: Subscription[] = [];
  
  constructor(private LoginService: LoginService, private router: Router, private zone: NgZone) {
  }

  private signInSubmit(form: any) {
     
     const data = {
      email: form.email,
      password: form.password,
     };

     console.log(data);

     this.subscriptions.push(
       this.LoginService
         .login(data)
         .subscribe(this.onLoginSuccess.bind(this), this.onLoginError)
      )
   }

   onLoginError (err){
    console.error(err);
    alert('User not found')
  }

  onLoginSuccess (res: any): void {
     console.log(res);
     
     this.LoginService.setUserState(res);
     this.router.navigate(['chat']);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }

}
