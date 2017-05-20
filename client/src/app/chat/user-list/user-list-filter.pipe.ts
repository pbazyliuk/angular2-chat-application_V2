import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'app/core/models/user';

@Pipe({
  name: 'filterUserByName'
})

export class FilterUserByNamePipe implements PipeTransform {
  public transform(users: User[], filterValue: string) {
    if (users) {
      return users.filter(user => {
          return user.firstname.match(new RegExp(filterValue, 'i'));
      });
    } else {
      return users;
    }
  }
}
