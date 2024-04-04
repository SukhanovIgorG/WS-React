import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { createAdapter } from 'src/utils/adapter';
import { User } from 'src/types';
import { usersDB } from 'src/dataBase/users';

const usersAdapter = createAdapter(usersDB);

@Injectable()
export class UsersService {
  create(createUserDto: User) {
    if (!createUserDto.id) createUserDto.id = uuid();
    return usersAdapter.add(createUserDto);
  }

  findAll() {
    return usersAdapter.findAll();
  }

  findMe() {
    const meId = 'testUser1';
    return usersAdapter.findById(meId);
  }
}
