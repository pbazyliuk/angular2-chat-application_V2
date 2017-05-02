import { Component, OnInit } from '@angular/core';
import { ThreadsService } from "app/core";

@Component({
  selector: 'ct-thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  constructor(private threadService: ThreadsService) { }

  ngOnInit() {

    this.threadService.loadUserThreads
  
  }

}
