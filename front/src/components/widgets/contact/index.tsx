import { User } from '../../../types'
import './style.css'

interface ContactProps {
  user: User;
  onClick: (id: string) => void;
  active: boolean;
}

export const Contact = ({ user, onClick, active }: ContactProps) => {
  const { name, id } = user
  return (
    <div className={`card ${active && 'activeDialog'}`} onClick={() => onClick(id) }>
      <div className="photo">😀</div>
      <p className="name">{name}</p>
    </div>
  )
}