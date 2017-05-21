import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'app/core/models/user';


@Pipe({
  name: 'filterUserOnByName'
})

export class FilterUserOnByNamePipe implements PipeTransform {
  public transform(users: User[]) {
    if (users) {
      return users.sort(function(a, b){
          const keyA = a.isLogged,
              keyB = b.isLogged;
          if (keyA < keyB) {
            return 1;
          };
          if (keyA > keyB) {
            return -1;
          };
          return 0;
      });
    }
  }
}
