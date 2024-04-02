import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';
import { MessageModule } from './message/message.module';
import { MessageService } from './message/message.service';

@Module({
  imports: [MessageModule],
  controllers: [AppController],
  providers: [AppService, MessageService, ChatGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  }
};
