import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { API_CONFIG } from '../app.constants';

@Injectable()
export class LoginService {

  private _authenticated: boolean = false;
  private _state: BehaviorSubject<any> = new BehaviorSubject<any>({});
    
  constructor(private http: Http){}
  

  public login(user: any): Observable<any> {
    console.log(this.http.post('http://localhost:8090/signin', user).map(res => res.json()))
    return this.http.post('http://localhost:8090/signin', user).map(res => res.json());
  }

  public setUserState(state: any): void {
    this._authenticated = true;
    localStorage.setItem('token', state.token);
    this._state.next(state);
  }

}