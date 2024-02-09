import { Injectable } from '@nestjs/common';
import { CreateUserType } from '../../../utils/types';

//permet d'inhecter une insatance de ce service dans un autre service
//Accesseur de dépendance (C#)
@Injectable()
export class UsersService {
  private fakeUsers = [
    { id: 1, username: 'tonton', email: 'xxxxxx@xxxxx' },
    { id: 2, username: 'tonton', email: 'xxxxxx@xxxxx' },
    { id: 3, username: 'tonton', email: 'xxxxxx@xxxxx' },
  ];
  fetchUsers() {
    return this.fakeUsers;
  }

  createUser(userDetails: CreateUserType) {
    this.fakeUsers.push(userDetails);
    return true;
  }
}
