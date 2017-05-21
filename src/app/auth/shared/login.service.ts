import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  constructor(
    private http: Http,
    private router: Router
  ) {}
  login(user: any): Observable<any> {
    return this.http.post('https://chatappeleks.herokuapp.com/signin', user).map(res => res.json());
  }

  register(user: any): Observable<any> {
    return this.http.post('https://chatappeleks.herokuapp.com/signup', user).map(res => res.json());
  }

  logout(): any {
    localStorage.removeItem('token');
    console.log('user logged out');
  }
}
