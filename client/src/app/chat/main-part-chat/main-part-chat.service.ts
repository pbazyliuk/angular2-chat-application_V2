import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// import { Observable } from 'rxjs';

@Injectable()
export class MainPartChatService {
    private messageObj$ = new Subject();

    private connection$ = new Subject();

    private chatname$ = new Subject();

    private search$: BehaviorSubject<string> = new BehaviorSubject('');

    private searchMessage$: BehaviorSubject<string> = new BehaviorSubject('');

    private isMenuShown$ =  new Subject();

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
  
  setSearchMessage(value: string): void {
      console.log('SET MESSAGE VALUE');
      this.searchMessage$.next(value);
  }

  getSearchMessage(): BehaviorSubject<string> {
    return this.searchMessage$;
  }

  getIsMenuShown() {
    return this.isMenuShown$;
  }

  updateIsMenuShown(data) {
    console.log('isChatMenuShown', data);
    this.isMenuShown$.next(data);
  }
}
