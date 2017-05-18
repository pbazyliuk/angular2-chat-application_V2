import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

// import { Observable } from 'rxjs';

@Injectable()
export class MainPartChatService {
    private messageObj$ = new Subject();

    private connection$ = new Subject();

    private chatname$ = new Subject();

    private search$: BehaviorSubject<string> = new BehaviorSubject('');

    getData() {
        return this.messageObj$;
    }

    updateData(data: object) {
        this.messageObj$.next(data);
    }

    updateConnection(data: object) {
        this.connection$.next(data);
    }

    getConnection() {
        return this.connection$;
    }
    
    getChatname() {
        return this.chatname$;
    }

    updateChatname(data: object) {
        this.chatname$.next(data);
    }

  setSearchValue(value: string): void {
      console.log('SET SEARCH VALUE');
    this.search$.next(value);
  }

  getSearchValue(): BehaviorSubject<string> {
    return this.search$;
  }
}