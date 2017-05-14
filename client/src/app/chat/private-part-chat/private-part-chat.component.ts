import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { ApplicationState } from "app/store/application-state";
import { WsService } from "app/ws.service";

@Component({
  selector: 'ct-private-part-chat',
  templateUrl: './private-part-chat.component.html',
  styleUrls: ['./private-part-chat.component.css']
})
export class PrivatePartChatComponent implements OnInit, OnDestroy {
  private chatname;
  private connectionRoom;
  constructor(private route: ActivatedRoute,
private store: Store<ApplicationState>,
private ws: WsService) { }

initWsRoom() {
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
       if(this.connectionRoom) this.connectionRoom.unsubscribe();
       this.initWsRoom();
       // In a real app: dispatch action to load the details here.
    });
    console.log('this.value', this.chatname)
   

  }

  ngOnDestroy() {
    this.connectionRoom.unsubscribe()
  }

}
