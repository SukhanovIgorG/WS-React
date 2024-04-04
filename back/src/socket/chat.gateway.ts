import { Server } from 'socket.io';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { messageAdapter } from 'src/dataBase';
import { v4 as uuid } from 'uuid';
import type { Message } from '../types';

@WebSocketGateway(
  {
    cors: {
      origin: '*',
    },
  },
)
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  private clients = new Map<string, any>();

  handleConnection(client: any, ...args: any[]) {
    this.clients.set(client.id, client);
  };

  handleDisconnect(client: any) {
    this.clients.delete(client.id);
  };

  @SubscribeMessage('new-message')
  handleNewMessage(@MessageBody() createDto: Omit<Message, 'id'>, @ConnectedSocket() client: any) {
    const id: string = uuid()
    const dto = { ...createDto, id }
    const res = messageAdapter.add(dto);
    const targetClient = this.clients.get(res.to);
    if (targetClient) {
      targetClient.emit("new-message", res);
    }
    client.emit("new-message-res", res);
  };

  @SubscribeMessage('dell-message')
  handleDelMessage(@MessageBody() dellID: Message['id'], @ConnectedSocket() client: any) {
    const res = messageAdapter.removeById(dellID);
    if (res) {
      const targetClient = this.clients.get(res.to);
      if (targetClient) {
        targetClient.emit("dell-message", res);
      }
      client.emit("dell-message-res", res);
    } else throw Error();
  };
}