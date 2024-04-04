export interface Message {
  id: string;
  from: User['id'];
  to: User['id'];
  date: string;
  text: string;
  deleted: boolean;
}

export interface User {
  id: string;
  name: string;
}