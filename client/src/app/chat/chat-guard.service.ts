import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../core/auth.service";

@Injectable()
export class ChatGuard implements CanActivate {
    constructor(private  loginService: AuthService,
                private router: Router){}

    canActivate(){
        console.log('isLoggedIn', this.loginService.isLoggedIn);
        if (this.loginService.isLoggedIn) {
            this.router.navigate(['chat']);
            return false;
        }
        return true;
     }
}