import io, { Socket } from "socket.io-client";

export class SocketApi {
  static socket: null | Socket = null;

  static createConnection() {
    this.socket = io('http://localhost:5173/');

    this.socket.on('connect', () => {
      console.log('#WS connection ',);
    });

    this.socket.on('# WS disconnect', () => {
      console.log('disconnection e:>> ');
    });
  }
}