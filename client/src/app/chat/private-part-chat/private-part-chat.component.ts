import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { ApplicationState } from "app/store/application-state";
import { WsService } from "app/ws.service";
import { MessageAddSuccessActions, PrivateMessageAddSuccessActions } from "app/store/actions";
import { MainPartChatService } from "app/chat/main-part-chat/main-part-chat.service";

@Component({
  selector: 'ct-private-part-chat',
  templateUrl: './private-part-chat.component.html',
  styleUrls: ['./private-part-chat.component.css']
})
export class PrivatePartChatComponent implements OnInit, OnDestroy {
  @Input() chatname;
  private connectionRoom;
  private connection;
  constructor(private route: ActivatedRoute,
private store: Store<ApplicationState>,
private ws: WsService,
private MainPartChatService: MainPartChatService) { }

initWsRoom() {
  // this.connectionRoom = this.ws.initRoomWs()
  //       .subscribe(message => {
  //         console.log(message);
  //         // this.store.dispatch(new MessageAddSuccessActions(message))
  //       })
console.log('initWsRoom working');
   this.connectionRoom = this.ws.initRoomWs(this.chatname)
        .subscribe(privateMessage => {
          console.log('privateMessage111', privateMessage);
          //privateMessage['chatname'] = this.chatname;
          this.store.dispatch(new PrivateMessageAddSuccessActions(privateMessage))
        })
}

  ngOnInit() {
    this.route.params.subscribe(params => {
        // (+) converts string 'id' to a number
       console.log('params', params.id);
      this.chatname = params.id;
      this.MainPartChatService.updateChatname(this.chatname);
       if(this.connectionRoom) {this.connectionRoom.unsubscribe(); console.log('connectionRoom unsubscribe')}
       this.initWsRoom();
       console.log('INIT PRIVATE CHAT');
      //  this.MainPartChatService.getData().subscribe(data => {
      // console.log('MESSAGE on CHAT COMP', data);
      //   this.message = data;
      // })


       
    });
  }

  ngOnDestroy() {
    this.connectionRoom.unsubscribe();
  }
}
