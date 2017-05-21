import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileService {

  constructor(private http: Http) { }

  public updateProfile(user: any): Observable<any> {
    return this.http.put(`https://chatappeleks.herokuapp.com/api/users/${user._id}`, user).map(res => res.json());
  }
}



