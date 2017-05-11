import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
// import { Observable } from 'rxjs';

@Injectable()
    export class ChatMenuService {

        private counter;
    constructor(private http: Http, private router: Router) {}

       sendChatData(formAddChatData) {
            console.log(formAddChatData)
           //this.router.navigate(['chat']);
           //formAddChatData.id = this.counter++;
           
        return this.http.post('http://localhost:8090/api/chats', formAddChatData).map(res => res.json())
            .subscribe(userInfo => {
                console.error(userInfo)
            }
        );
       }
    }

