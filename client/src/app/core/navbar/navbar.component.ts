import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ct-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private email: string = '';
  private subscriptions: Subscription[] = [];

  constructor( private loginService: LoginService, private router: Router ) {}

  ngOnInit() {
     this.subscriptions.push(
       this.loginService
         .getUserState()
         .subscribe(state => { 
           if(state.user) {
            this.email = state.user.email; console.log(state.user.email)
           }
           else {
             return {}
           }
          })
     )
  }

  ngOnDestroy() {
     this.subscriptions.map(subscription => subscription.unsubscribe());
   }

  isLogged() {
    return this.loginService.authenticated;
  };
  
  logoutAction() {
    this.loginService.logout();
    //this.router.navigate(['auth/login']);
  }
}
