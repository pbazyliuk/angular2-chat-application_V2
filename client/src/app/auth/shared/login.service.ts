import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { API_CONFIG } from '../../app.constants';
import { Router } from "@angular/router";

@Injectable()
export class LoginService {

  private _authenticated: boolean = false;
  private _state: BehaviorSubject<any> = new BehaviorSubject<any>({});
    
  constructor(private http: Http, private router: Router){}
  
  public setUserState(state: any): void {
    this._authenticated = true;
    localStorage.setItem('token', state.token);
    this._state.next(state);
  }
  
  public getUserState(): BehaviorSubject<any> {
    return this._state;
  }

  public get authenticated(): boolean {
    return this._authenticated;
  }

  public login(user: any): Observable<any> {
    return this.http.post('http://localhost:8090/signin', user).map(res => res.json());
  }

  public register(user: any): Observable<any> {
    return this.http.post('http://localhost:8090/signup', user).map(res => res.json());
  }

  public logout(): any {
    // this._authenticated = false;
    // this._state.next({});
    localStorage.removeItem('token');
    // this.router.navigate(['home']);
    console.log('user logged out');
  }
}