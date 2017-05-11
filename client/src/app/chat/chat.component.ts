import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { WsService } from "app/ws.service";
import { ApplicationState } from "app/store/application-state";

@Component({
  selector: 'ct-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public isChatListFolded: boolean;
  public isChatMenuShown: boolean;

  constructor(private store: Store<ApplicationState>, private ws: WsService) {}

  onNotifyChatListFold(message:boolean):void {
    this.isChatListFolded = message;
  }

  onNotifyChatMenuShow(message:boolean):void {
    this.isChatMenuShown = message;
  }

  ngOnInit() {
    console.error('NGONINT')
  //  this.ws.initWs()
  //   .subscribe(val => {
  //     console.log(val)
  //   })
  }

}
