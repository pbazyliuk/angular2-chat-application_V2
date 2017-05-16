import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { ApplicationState } from "app/store/application-state";
import { WsService } from "app/ws.service";
import { MessageAddSuccessActions } from "app/store/actions";
import { MainPartChatService } from "app/chat/main-part-chat/main-part-chat.service";

@Component({
  selector: 'ct-private-part-chat',
  templateUrl: './private-part-chat.component.html',
  styleUrls: ['./private-part-chat.component.css']
})
export class PrivatePartChatComponent implements OnInit, OnDestroy {
  private chatname;
  private connectionRoom;
  private connection;
  constructor(private route: ActivatedRoute,
private store: Store<ApplicationState>,
private ws: WsService,
private MainPartChatService: MainPartChatService) { }

initWsRoom() {
  //this.connection.unsubscribe()
   this.connectionRoom = this.ws.initRoomWs()
        .subscribe(message => {
          console.log(message);
          // this.store.dispatch(new MessageAddSuccessActions(message))
        })
}

  ngOnInit() {
    this.route.params.subscribe(params => {
        // (+) converts string 'id' to a number
       console.log('params', params.id);
      this.chatname = params.id;
       if(this.connectionRoom) {this.connectionRoom.unsubscribe(); console.log('connectionRoom unsubscribe')}
       //this.initWsRoom();
       console.log('INIT PRIVATE CHAT');
        this.connectionRoom = this.ws.initRoomWs()
        .subscribe(message => {
          console.log(message);
          // this.store.dispatch(new MessageAddSuccessActions(message))
        })
       // In a real app: dispatch action to load the details here.
    });
    console.log('this.value', this.chatname)
   

  }

  ngOnDestroy() {
    console.log('DESTROY');
    this.connection = this.MainPartChatService.getConnection();
    console.error('this.connection', this.connection);
    //this.connection.unsubscribe();

    this.connectionRoom.unsubscribe();
        console.error('this.connectionRoom', this.connectionRoom);
        if(this.connection) {
            //this.connection.unsubscribe();
            // this.connection = this.ws.initWs()
            // .subscribe(message => {
            //   console.log(message);
            //   this.store.dispatch(new MessageAddSuccessActions(message))
            // })
            // this.connection.unsubscribe();
            // this.MainPartChatService.updateConnection(this.connection);
        }
   
           console.error('this.connection', this.connection);

  }

}
