export interface Message {
  id: string;
  user: User;
  date: string;
  text: string;
}

export interface User {
  name: string;
  email: string;
}