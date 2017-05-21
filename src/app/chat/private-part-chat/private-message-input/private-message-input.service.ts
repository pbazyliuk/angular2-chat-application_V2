import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Injectable()
  export class PrivateMessageInputService {

  constructor(private http: Http) {}

  sendPrivateMessage(message, chatname) {
    return this.http.post(`https://chatappeleks.herokuapp.com/api/chats/${chatname}`, message).map(res => res.json());
  }

  getAllMessagesFromPrivateChat(chatname) {
    return this.http.get(`https://chatappeleks.herokuapp.com/api/chats/${chatname}`).map(res => res.json());
  }
}
