export interface Message {
  id: string;
  from: User['name'];
  to: User['name'];
  date: string;
  text: string;
  deleted?: boolean;
}

export interface User {
  id: string;
  name: string;
}