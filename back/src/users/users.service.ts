import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { createAdapter } from 'src/utils/adapter';
import { User } from 'src/types';
import { userAdapter } from 'src/dataBase';

@Injectable()
export class UsersService {
  create(createUserDto: User) {
    if (!createUserDto.id) createUserDto.id = uuid();
    return userAdapter.add(createUserDto);
  }

  findAll() {
    return userAdapter.findAll();
  }

  findMe() {
    const meId = 'testUser1';
    return userAdapter.findById(meId);
  }
}
