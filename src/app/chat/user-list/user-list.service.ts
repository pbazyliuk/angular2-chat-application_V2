import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
    export class UserListService {
    constructor(private router: Router, private http: Http) {}

       getAllUsers() {
        return this.http.get('https://chatappeleks.herokuapp.com/api/users').map(res => res.json());
       }
    }

