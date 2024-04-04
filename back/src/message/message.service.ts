import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { messagesDB } from 'src/dataBase';
import { Message } from 'src/types';
import { createAdapter } from 'src/utils';

const messagesAdapter = createAdapter(messagesDB);
@Injectable()
export class MessageService {
  getAllMessages(): Message[] {
    return messagesAdapter.findAll();
  };
  postMessage(createDto: Message): Message {
    const id: string = uuid()
    const dto = { ...createDto, id }
    return messagesAdapter.add(dto);
  };
  deleteMessageByID(id: string): { id: string } {
    const deleted = messagesAdapter.removeById(id);
    return deleted['id'];
  };
}
