
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class MessageInputService {
  private url = 'https://chatappeleks.herokuapp.com';  
  private socket;
  
//   sendMessage(message, author){
//     //this.socket.emit('add-message', message, author);    
//   }
  
  getMessages() {
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