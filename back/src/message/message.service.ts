import { Injectable } from '@nestjs/common';
import { messagesDB } from 'src/dataBase';
import { Message } from 'src/types';
import { createAdapter } from 'src/utils';
import { v4 as uuid } from 'uuid';

const messagesAdapter = createAdapter(messagesDB);

const allMessages = messagesAdapter.findAll();
@Injectable()
export class MessageService {
  getAllMessages(): Message[] {
    return allMessages;
  }
  postMessage(createDto: Message): Message {
    const id: string = uuid()
    const dto = { ...createDto, id }
    return messagesAdapter.add(dto);
  }
  deleteMessageByID(id: string): { id: string } {
    const deleted = messagesAdapter.removeById(id);
    return deleted['id'];
  }
}
