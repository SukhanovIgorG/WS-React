import { Message } from '../../../../shared/types'
import { Contact, Dialog, MessageInput } from '../../components'
import './style.css'

export const MessengerPage = () => {
  const mess: Message = {
    id: 'id21we',
    date: new Date().toDateString(),
    text: 'Hello',
    user: {
      email: 'qwe@gmail.com',
      name: 'qwe',
    }
  }
  
  return (
    <section className='messenger'>
      <div className='container contacts'>
        {Array(12).fill(0).map(() => <Contact />)}
      </div>
      <div className='container viewer'>
        <Dialog messages={Array(12).fill(mess)}/>
        <MessageInput />
      </div>
    </section>
  )
}