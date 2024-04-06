import { ChangeEvent, FormEventHandler, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Message } from '../../../types';
import { SocketApi } from '../../../api/socket-api';

import './style.css';

interface MessageInputProps {
  currentUser: string;
  currentDialog: string;
}

export const MessageInput = ({ currentUser, currentDialog }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleNewMessageResponse = (res: Message) => {
    if (res.id) {
      const currentMessages = queryClient.getQueryData<Message[]>('messages');
      const updatedMessages = [...(currentMessages || []), res];
      queryClient.setQueryData('messages', updatedMessages);
      SocketApi.socket?.off('new-message-res', handleNewMessageResponse);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const dto: Partial<Message> = {
      text: message,
      from: currentUser,
      to: currentDialog,
      date: new Date().toDateString(),
      deleted: false,
    }
    SocketApi.socket?.emit('new-message', dto);
    setMessage('');
    SocketApi.socket?.on('new-message-res', handleNewMessageResponse);
  };

  return (
    <form className="inputWindow" id="inputWindow" onSubmit={handleSubmit}>
      <input
        type="text"
        id="newMessage"
        className="input"
        name="message"
        value={message}
        onChange={handelChange}
      />
      <button type='submit' className="button">отправить</button>
    </form>
  );
};
