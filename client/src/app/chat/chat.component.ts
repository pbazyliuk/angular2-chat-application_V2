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

  constructor(private store: Store<ApplicationState>, private ws: WsService) {}

  ngOnInit() {
    console.error('NGONINT')
  //  this.ws.initWs()
  //   .subscribe(val => {
  //     console.log(val)
  //   })
  }

}
