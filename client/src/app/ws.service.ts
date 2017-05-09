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
    
  
//  let observable = new Observable(observer => {
//       this.socket = io(this.url);
//       this.socket.on('message', (data) => {
//         observer.next(data);    
//       });
//       return () => {
//         this.socket.disconnect();
//       };  
//     })     
//     return observable;
// }

let observable = new Observable(observer => {
    this.socket = io(this.url);
    this.socket.on('connect', function () {
      this.socket
        .on('authenticated', function () {
            console.log('authenticated client')
        })
        
        .emit('authenticate', {token: localStorage.getItem('token')})
        .on('join', function (val) {
            console.log('join', val.user)
        })
        // .on('disconnect', function () {
        //     console.log('disconnect client')
            
        // })
        
        .on('leave', function (val) {
            console.log('leave', val.user)
        })
        .on('message', (data) => {
            observer.next(data);    
        })

    }.bind(this))
    return () => {
            this.socket.disconnect();
        };  
})
 return observable;
 }
}




