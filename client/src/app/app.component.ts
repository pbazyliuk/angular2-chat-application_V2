import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { WsService } from "app/ws.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  private authenticated;


  constructor(private store: Store<ApplicationState>, private ws: WsService) {
    
    // store.subscribe(
    //   state => {
    //     console.log("App nComponent section received state", state)
    //     console.error('App init');
    //     this.authenticated = state.uiState.authenticated;
    //     console.error(this.authenticated);
    //   }
       
    // )

  }

  ngOnInit() {
   console.error('NGONINT')
   this.ws.initWs()
    .subscribe(val => {
      console.log(val)
    })
  }  
  
}
