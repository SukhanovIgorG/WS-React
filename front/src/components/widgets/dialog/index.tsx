import { MessageItem } from './messageItem';
import { Message } from '../.././../types';
import './style.css'

interface DialogProps {
  messages: Message[];
}

export const Dialog = ({ messages }: DialogProps ) => {
  return (
    <div className="dialog">
      {messages.map((message, i) => {
        return <MessageItem message={message} my={i % 2 == 0} />
      }) }
    </div>
  )
}