import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { ApplicationState } from "app/store/application-state";

@Component({
  selector: 'ct-private-part-chat',
  templateUrl: './private-part-chat.component.html',
  styleUrls: ['./private-part-chat.component.css']
})
export class PrivatePartChatComponent implements OnInit {
  private chatname;
  constructor(private route: ActivatedRoute,
private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        // (+) converts string 'id' to a number
       console.log('params', params.id)
      this.chatname = params.id;
       // In a real app: dispatch action to load the details here.
    });
    console.log('this.value', this.chatname)
  }

}
