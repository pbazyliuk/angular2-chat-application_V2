import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
    export class UserListService {
    constructor(private router: Router, private http: Http) {}

       getAllUsers() {
        return this.http.get('http://localhost:8090/api/users').map(res => res.json());
       }
    }

