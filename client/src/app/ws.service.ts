import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { LoadChatListActions } from "app/store/actions";
import { UserListService } from "./chat/user-list/";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { Http } from '@angular/http';

@Injectable()
export class WsService {
  private url = 'http://localhost:8090';  
  private socket;
  constructor(private userlistservice: UserListService, private store: Store<ApplicationState>, private http: Http) { 
    //   this.chatlistservice.getAllUsers.bind(this)
    
  }

  sendMessage(message){
    this.socket.emit('add-message', message);   
  }

 initWs() {
    console.log(
        this.userlistservice.getAllUsers
    )
    var getAllUsers = this.userlistservice.getAllUsers();
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


    initRoomWs() {
        var room = "abc123";
         let observable = new Observable(observer => {
            this.socket = io(`${this.url}/namespace`);
            this.socket.on('connect', function () {
                console.log('user connection to room', room)
                console.log(this.socket.emit('room', room))
                this.socket.emit('room', room);
                
                this.socket.on('message', function(data) {
                    console.log('Incoming message:', data);
                    });
      
    }.bind(this))

    return () => {
            this.socket.disconnect();
        };  
})
 return observable;
    }
}





