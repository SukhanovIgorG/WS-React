import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from 'src/types';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }
  @Get()
  GetAllMessages(): Message[] {
    return this.messageService.getAllMessages();
  };

  @Post()
  postMessage(@Body() newMessage: Message): Message {
    return this.messageService.postMessage(newMessage);
  };

  @Delete(':id')
  DeleteMessageByID(@Param('id') id: string): { id: string } {
    return this.messageService.deleteMessageByID(id);
  };
}
