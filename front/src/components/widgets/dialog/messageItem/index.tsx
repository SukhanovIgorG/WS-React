import { ReactNode } from 'react';
import { useMutation } from 'react-query';
import { Message } from '../../../../types';
import { deleteMessage } from '../../../../api';

import './style.css';

interface MessageItemProps {
  message: Message;
  my: boolean;
}

export const MessageItem = ({ message, my }: MessageItemProps): ReactNode => {
  const { text, date, id } = message;
  const mutation = useMutation(deleteMessage);
  
  const deleteHandler = () => {
    mutation.mutate(id);
  };

  return (
    <div className={`message ${my && 'myMessage'}`}>
      <button className='deleteButton' onClick={deleteHandler}>❌</button>
      <p className="text">{text}</p>
      <p className="date">{date}</p>
    </div>
  )
}