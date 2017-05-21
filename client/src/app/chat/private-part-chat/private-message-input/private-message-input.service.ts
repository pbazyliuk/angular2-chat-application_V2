import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Injectable()
  export class PrivateMessageInputService {

  constructor(private http: Http) {}

  sendPrivateMessage(message, chatname) {
    return this.http.post(`http://localhost:8090/api/chats/${chatname}`, message).map(res => res.json());
  }

  getAllMessagesFromPrivateChat(chatname) {
    return this.http.get(`http://localhost:8090/api/chats/${chatname}`).map(res => res.json());
  }
}
