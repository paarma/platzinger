import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user';

@Pipe({
  name: 'searchByEmail'
})
export class SearchByEmailPipe implements PipeTransform {

  transform(users: User[], searchFilter: string): User[] {
    if(!users){
      return;
    }

    if(!searchFilter){
        return users;
    }

    searchFilter = searchFilter.toLowerCase();

    return users.filter((item => {
        return JSON.stringify(item.email).toLowerCase().includes(searchFilter);
    }));
  }

}
