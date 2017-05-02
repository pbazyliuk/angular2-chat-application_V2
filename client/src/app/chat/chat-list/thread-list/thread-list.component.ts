import { Component, OnInit, Input } from '@angular/core';
import { ThreadSummaryVM } from "app/chat/chat-list/thread-section/thread-summary.vw";

@Component({
  selector: 'ct-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  @Input()
  threads: ThreadSummaryVM[];

  constructor() { }

  ngOnInit() {
  }

}
