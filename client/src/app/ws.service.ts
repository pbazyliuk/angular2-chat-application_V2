import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class WsService {
  private url = 'http://localhost:8090';  
  private socket;

  constructor() { }

  sendMessage(message, author){
    this.socket.emit('add-message', message, author);    
  }

 initWs() {
    
 let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
}
 
}




