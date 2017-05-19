import { Pipe, PipeTransform } from '@angular/core';
import { Chat } from 'app/core/models/chat';

@Pipe({
  name: 'filterChatByName'
})

export class FilterChatByNamePipe implements PipeTransform {
  public transform(chats: Chat[], filterValue: string) {
    if (chats) {
        return chats.filter(chat => {
          return chat.name.match(new RegExp(filterValue, 'i'));
        });
    } 
    else {
      return chats;
    }
  }
}
