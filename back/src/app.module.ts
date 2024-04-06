import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketGateway } from './socket/socket.gateway';
import { MessageModule } from './message/message.module';
import { MessageService } from './message/message.service';
import { UsersModule } from './users/users.module';
import { SocketService } from './socket/socket.service';

@Module({
  imports: [MessageModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, MessageService, SocketGateway, SocketService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  }
};
