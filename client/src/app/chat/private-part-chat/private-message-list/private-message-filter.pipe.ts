import { Pipe, PipeTransform } from '@angular/core';
import { Message } from "app/core/models/message";


@Pipe({
    name: 'filterPrivateMessageByText',
    pure: false
})

export class FilterPrivateMessageByTextPipe implements PipeTransform {
    public transform(messages: Message[], filterValue: string) {
        if (messages) {
            return messages.filter(message => {
                // let pattern = 
                return message.text.match(new RegExp(filterValue, 'i'));
            });
        } else {
            return messages;
        }
    }

}