import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  constructor(
    private http: Http,
    private router: Router
  ) {}
  
  login(user: any): Observable<any> {
    return this.http.post('http://localhost:8090/signin', user).map(res => res.json());
  }

  register(user: any): Observable<any> {
    return this.http.post('http://localhost:8090/signup', user).map(res => res.json());
  }

  logout(): any {
    localStorage.removeItem('token');
    console.log('user logged out');
  }
}
