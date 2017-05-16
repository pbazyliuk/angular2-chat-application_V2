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
  private socketRoot;
  private socketPrivateChat;
  private room;

  constructor(private userlistservice: UserListService, private store: Store<ApplicationState>, private http: Http) { 
    //   this.chatlistservice.getAllUsers.bind(this)
    
  }
  sendPrivateMessage(privateMessage, room) {
     this.socketPrivateChat.emit('add-private-message', privateMessage, room);    
  }

  sendMessage(message){
    console.log('SEND MESSAGE', this.socketRoot)
    this.socketRoot.emit('add-message', message);   
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
    
    this.socketRoot = io(`${this.url}/root`);
    this.socketRoot.on('connect', function () {
        
      this.socketRoot
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
            this.socketRoot.disconnect();
        };  
})
 return observable;
}


    initRoomWs(room) {
        this.room = room
        console.log('initRoomWs', room)
        //var room = "abc123";
         let observable = new Observable(observer => {
            this.socketPrivateChat = io(`${this.url}/privatechat`);
            this.socketPrivateChat.on('connect', function () {
                console.log('user connection to room', room)
               this.socketPrivateChat.emit('room', room);
               
                console.log(this.socketPrivateChat)

                
                this.socketPrivateChat.on('disconnect', function (val) {
                        console.log('leave', val);
                        //this.socket.disconnect();
                });

                this.socketPrivateChat.on('add-private-message', function(data) {
                    console.log('Incoming message:', data); 
                    observer.next(data); 
                });

                // this.socket.on('leave', function (val) {
                //             console.log('leave', val);
                // })

        //         this.socket
        // .on('authenticated', function () {
        //     console.log('authenticated client')
        // })
        
        // .emit('authenticate', {token: localStorage.getItem('token')})
        // this.socket.emit("add-message", 'message from clinet')
        // .on('add-message', (data) => {
        //     console.log('message', data);
        //     observer.next(data);    
        // })
      
    }.bind(this))

    return () => {
            this.socketPrivateChat.disconnect();
        };  
})
 return observable;
    }
}





