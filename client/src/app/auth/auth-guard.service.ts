import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
//import { AuthService } from "../core/auth.service";
import { LoginService } from "./shared";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private  loginService: LoginService,
                private router: Router){}

    canActivate(){
        console.log('!authenticated', !this.loginService.authenticated);
        if (!this.loginService.authenticated){
            this.loginService.logout();
            this.router.navigate(['home']);
            return false;
        }
        return true;
     }
}