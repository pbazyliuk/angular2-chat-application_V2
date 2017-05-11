import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
// import { Observable } from 'rxjs';

@Injectable()
    export class ChatMenuService {
    constructor(private http: Http, private router: Router) {}

       sendChatData(formAddChatData) {
           console.log(formAddChatData)
           //this.router.navigate(['chat']);
        //return this.http.post('http://localhost:8090/api/chat', usersData).map(res => res.json());
       }
    }

