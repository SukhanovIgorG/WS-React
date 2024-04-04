import { ReactNode } from 'react';
import { useQueryClient } from 'react-query';
import { SocketApi } from '../../../../api/socket-api';
import type { Message } from '../../../../types';

import './style.css';

interface MessageItemProps {
  message: Message;
  my: boolean;
}

export const MessageItem = ({ message, my }: MessageItemProps): ReactNode => {
  const { text, date, id } = message;
  const queryClient = useQueryClient();

  const handleDellMessageRes = (res: { id: string; deleted: boolean }) => {
    if (res.id) {
      const currentMessages = queryClient.getQueryData<Message[]>('messages');
      const updatedMessages = (currentMessages || []).filter(item => item.id !== res.id);
      queryClient.setQueryData('messages', updatedMessages);
      SocketApi.socket?.off('dell-message-res', handleDellMessageRes);
    } else {
      alert('При удалении сообщения произошла ошибка')
    }
  };
  
  const deleteHandler = () => {
    SocketApi.socket?.emit('dell-message', id);
    SocketApi.socket?.on('dell-message-res', handleDellMessageRes);
  };

  return (
    <div className={`message ${my && 'myMessage'}`}>
      <button className='deleteButton' onClick={deleteHandler}>❌</button>
      <p className="text">{text}</p>
      <p className="date">{date}</p>
    </div>
  )
}