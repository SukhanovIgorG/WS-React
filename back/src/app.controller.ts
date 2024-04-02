import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Message } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  };

  @Get('message')
  GetAllMessages(): Message[] {
    return this.appService.getAllMessages();
  };

  @Post('message')
    postMessage(@Body() newMessage: Message): Message {
    return this.appService.postMessage(newMessage);
    };

  @Delete('message/:id')
    DeleteMessageByID(@Param('id') id: string): { id: string } {
    return this.appService.deleteMessageByID(id);
    };
};