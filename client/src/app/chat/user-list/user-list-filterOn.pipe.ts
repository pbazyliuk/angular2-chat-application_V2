import { Pipe, PipeTransform } from '@angular/core';
import { User } from "app/core/models/user";


@Pipe({
    name: 'filterUserOnByName'
})

export class FilterUserOnByNamePipe implements PipeTransform {
    public transform(users: User[]) {
        if (users) {
            return users.sort(function(a, b) {
               return (a.isLogged === b.isLogged === true && a.firstname < b.firstname) ? 
                1 : -1;
            });
           
            // return users.sort(function(a, b){
            //     var keyA = a.isLogged,
            //         keyB = b.isLogged
            //     // Compare the 2 dates
            //     if(keyA < keyB) return 1;
            //     if(keyA > keyB) return -1;
            //     return 0;
            // });
    }
    }
}