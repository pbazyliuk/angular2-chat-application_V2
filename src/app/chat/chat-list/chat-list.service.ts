import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
  export class ChatListService {
    constructor(private router: Router, private http: Http) {}

    getAllChats() {
      return this.http.get('http://localhost:8090/api/chats').map(res => res.json());
    }
  }

