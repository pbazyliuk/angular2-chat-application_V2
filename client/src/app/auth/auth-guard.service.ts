import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './shared';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/store/application-state';

@Injectable()
export class AuthGuard implements CanActivate {

  private authenticated: boolean;

  constructor(private  loginService: LoginService,
    private router: Router, private store: Store<ApplicationState>) {
      this.store
        .subscribe(state => {
          console.error('state', state);
          this.authenticated = state.uiState.authenticated;
        });
  }

  canActivate() {
    if (!this.authenticated) {
      this.loginService.logout();
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
