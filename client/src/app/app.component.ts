import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/store/application-state';
import { WsService } from 'app/ws.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public authenticated;

  constructor(
    private store: Store<ApplicationState>,
    private ws: WsService
  ) {}

  ngOnInit() {
   console.error('NGONINT');
   this.ws.initWs()
    .subscribe(val => {
      console.log(val);
    });
  }
}
