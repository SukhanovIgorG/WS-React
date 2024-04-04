import { ChangeEvent, FormEventHandler, useState } from 'react';
import { useMutation } from 'react-query';
import { Message } from '../../../types';
import { sendMessage } from '../../../api';
import './style.css'
interface MessageInputProps {
  currentUser: string;
  currentDialog: string;
}

export const MessageInput = ({ currentUser, currentDialog }: MessageInputProps) => {
  const [message, setMessage] = useState('')
  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }

  const mutations = useMutation(sendMessage, {
    onSuccess: () => {
      setMessage('');
    },
    onError: (error) => {
      console.error('Ошибка при отправке сообщения:', error);
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const dto: Partial<Message> = {
      text: message,
      from: currentUser,
      to: currentDialog,
      date: new Date().toDateString(),
      deleted: false,
    }
    mutations.mutate(dto);
  }
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
  )
}