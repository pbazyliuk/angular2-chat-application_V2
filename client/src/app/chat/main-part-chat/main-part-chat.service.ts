import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

// import { Observable } from 'rxjs';

@Injectable()
export class MainPartChatService {
    private messageObj$ = new Subject();

    private connection$ = new Subject();

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
}