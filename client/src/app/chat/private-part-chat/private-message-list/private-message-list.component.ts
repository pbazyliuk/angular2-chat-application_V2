import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ct-private-message-list',
  templateUrl: './private-message-list.component.html',
  styleUrls: ['./private-message-list.component.css']
})
export class PrivateMessageListComponent implements OnInit {
  @Input() chatname: string;
  constructor() { }

  ngOnInit() {
  }

}
