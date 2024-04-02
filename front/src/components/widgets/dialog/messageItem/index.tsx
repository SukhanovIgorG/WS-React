import { ReactNode } from 'react';
import { Message } from '../../../../types';
import './style.css';

interface MessageItemProps {
  message: Message;
  my: boolean;
}
export const MessageItem = ({ message, my }: MessageItemProps): ReactNode => {
  const { text } = message;
  return (
    <div className={`message ${my && 'myMessage'}`}>
      <p className="text">{text}</p>
    </div>
  )
}