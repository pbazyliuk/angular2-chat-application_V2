import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/shared';
import { Subscription } from 'rxjs';
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { LogoutSuccessActions } from "app/store/actions";
import * as io from 'socket.io-client';
import { WsService } from "app/ws.service";

@Component({
  selector: 'ct-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private email: string = '';
  private authenticated: boolean = false;
  //private subscriptions: Subscription[] = [];

  constructor( private loginService: LoginService, private router: Router, private store: Store<ApplicationState>,
  private ws: WsService ) {
    this.store.subscribe(
      state => {
        console.log("Navbar Component section received state", state)
        if(state.uiState.user) {
          this.email = state.uiState.user.email;
          this.authenticated = state.uiState.authenticated;
           console.error('init')
        }
        else {
          this.authenticated = false;
          console.error('uninit')
          return;
        }
      }
    )
    // store.subscribe(
    //   state => console.log("navbar component received state", state)
    // )
  }

  ngOnInit() {
    //  this.subscriptions.push(
    //    this.loginService
    //      .getUserState()
    //      .subscribe(state => { 
    //        if(state.user) {
    //         this.email = state.user.email; console.log(state.user.email)
    //        }
    //        else {
    //          return {}
    //        }
    //       })
    //  )
     

    
  }

  ngOnDestroy() {
     //this.subscriptions.map(subscription => subscription.unsubscribe());
     //this.store.unsubscribe()
   }

  // isLogged() {
  //    this.store.subscribe(
  //     state => {
        
  //       if(state.uiState.authenticated) {
  //         //console.error(state.uiState.authenticated);
  //         return state.uiState.authenticated;
  //       }
  //       else {
  //         //console.error(state.uiState.authenticated);
  //         return false;
  //       }
  //     }
  //   )
  // };
  
  logoutAction() {
    
    this.loginService.logout()
      
      // .subscribe(() => {
      //   var socket = io.connect('http://localhost:8090');
      //         // socket.on('connect', function () {
      //         //   socket
      //         //     .on('authenticated', function () {
      //         //       //do other things 
      //         //       console.log('authenticate client')
      //         //     })
      //             socket.emit('disconnect', {token: localStorage.getItem('token')}); //send the jwt 
             
      
      // })
              

      this.store.dispatch(
      new LogoutSuccessActions())
        //this.router.navigate(['home']);

  }
}
