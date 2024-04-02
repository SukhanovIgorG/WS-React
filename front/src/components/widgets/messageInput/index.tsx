import { FormEventHandler } from 'react';
import './style.css'

export const MessageInput = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('e :>> ', e.target);
  }
  return (
    <form className="inputWindow" onSubmit={handleSubmit}>
      <input type="text" className="input" name="message" />
      <button type='submit' className="button">отправить</button>
    </form>
  )
}