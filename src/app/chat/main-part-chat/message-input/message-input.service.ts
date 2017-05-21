import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Injectable()
  export class MessageInputService {

    constructor(private http: Http) {}

    sendMessage(message) {
      return this.http.post('https://chatappeleks.herokuapp.com/api/messages', message).map(res => res.json());
    }

    getAllMessages() {
      return this.http.get('https://chatappeleks.herokuapp.com/api/messages').map(res => res.json());
    }
}
