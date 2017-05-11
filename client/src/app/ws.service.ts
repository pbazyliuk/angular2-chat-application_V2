import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { LoadChatListActions } from "app/store/actions";
import { ChatListService } from "./chat/chat-list";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { Http } from '@angular/http';

@Injectable()
export class WsService {
  private url = 'http://localhost:8090';  
  private socket;
  constructor(private chatlistservice: ChatListService, private store: Store<ApplicationState>, private http: Http) { 
    //   this.chatlistservice.getAllUsers.bind(this)
    
  }

  sendMessage(message){
    this.socket.emit('add-message', message);   
  }

 initWs() {
    console.log(
        this.chatlistservice.getAllUsers
    )
    var getAllUsers = this.chatlistservice.getAllUsers();
    var store = this.store;
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
            //console.log(getAllUsers)
            getAllUsers
            .subscribe(
                allUserData => store.dispatch(
                new LoadChatListActions(allUserData)
                )
            )
        })
        .on('leave', function (val) {
            console.log('leave', val.user);
            getAllUsers
            .subscribe(
                allUserData => store.dispatch(
                    new LoadChatListActions(allUserData)
                )
            )
        })
        .on('message', (data) => {
            console.log('message', data);
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




