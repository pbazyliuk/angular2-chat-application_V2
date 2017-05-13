import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

// import { Observable } from 'rxjs';

@Injectable()
export class MainPartChatService {
    private messageObj$ = new Subject();

    getData() {
        return this.messageObj$;
    }

    updateData(data: object) {
        this.messageObj$.next(data);
    }
}