import { MessageItem } from './messageItem';
import { Message, User } from '../.././../types';
import './style.css'

interface DialogProps {
  messages: Message[];
  me: User["name"];
}

export const Dialog = ({ messages, me }: DialogProps) => {
  return (
    <div className="dialog">
      {messages.map((message) => {
        return <MessageItem message={message} my={message.from == me } key={message.id}/>
      })}
    </div>
  )
}