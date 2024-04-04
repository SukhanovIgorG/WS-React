import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { messageAdapter } from 'src/dataBase';
import { Message } from 'src/types';

@Injectable()
export class MessageService {
  getAllMessages(): Message[] {
    return messageAdapter.findAll();
  };
  postMessage(createDto: Message): Message {
    const id: string = uuid()
    const dto = { ...createDto, id }
    return messageAdapter.add(dto);
  };
  deleteMessageByID(id: string): { id: string } {
    const deleted = messageAdapter.removeById(id);
    return deleted;
  };
}
