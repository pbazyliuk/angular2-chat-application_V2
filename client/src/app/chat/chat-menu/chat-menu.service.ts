import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { UsersListService } from "app/chat/users-list/users-list.service";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { LoadChatsListActions } from "app/store/actions";


@Injectable()
    export class ChatMenuService {

    constructor(private http: Http, private router: Router,  private UsersListService: UsersListService,
    private store: Store<ApplicationState>) {}

       sendChatData(formAddChatData) {
           
        this.http.post('http://localhost:8090/api/chats', formAddChatData).map(res => res.json())
            .subscribe(userInfo => {
                console.error('userInfo', userInfo)
                  this.UsersListService.getAllChats()
                    .subscribe(
                        allChats => {
                        this.store.dispatch(
                        
                        new LoadChatsListActions(allChats)
                        );
                        console.log('ALL CHATS MENU', allChats);
                        }
                )
            });
        
       
       }
    }

