import { Injectable } from '@nestjs/common';
import { messagesDB } from 'src/dataBase';
import { Message } from './types';
import { createAdapter } from './utils';
import { v4 as uuid } from 'uuid';

const messagesAdapter = createAdapter(messagesDB);

const allMessages = messagesAdapter.findAll();

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getAllMessages(): Message[] {
    return allMessages;
  }
  postMessage(createDto: Message): Message {
    const id: string = uuid()
    const dto = { ...createDto, id }
    return messagesAdapter.add(dto);
  }
  deleteMessageByID(id: string): {id: string } {
    const deleted = messagesAdapter.removeById(id);
    return deleted['id'];
  }
}
