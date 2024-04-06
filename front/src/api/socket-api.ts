import io, { Socket } from "socket.io-client";
import { Message } from "../types";

export class SocketApi {
  static socket: null | Socket = null;
  static handleNewMessage: (message: Message) => void;
  static handleDellMessage: (message: Message) => void;

  static createConnection() {
    if (!this.socket) {
      this.socket = io('http://localhost:5173/');

      this.socket.on('connect', () => {
        this.socket?.on('new-message', this.handleNewMessage);
        this.socket?.on('dell-message', this.handleDellMessage);
      });

      this.socket.on('disconnect', () => {
        this.socket?.off('new-message', this.handleNewMessage);
        this.socket?.off('dell-message', this.handleDellMessage);
      });
    }
  }

  static setHandleNewMessage(callback: (message: Message) => void) {
    this.handleNewMessage = callback;
  }

  static setHandleDellMessage(callback: (message: Message) => void) {
    this.handleDellMessage = callback;
  }

  static disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}