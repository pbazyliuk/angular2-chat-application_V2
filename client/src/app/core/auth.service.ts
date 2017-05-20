import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
    export class AuthService {
    constructor(private router: Router) {}

        get isLoggedIn() {
            return localStorage.getItem('token') == null ? false : true;
        };
}

