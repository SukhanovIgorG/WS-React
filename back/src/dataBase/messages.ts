import { Message } from "src/types";

export const messagesDB: Message[] = [
  {
    id: "message1",
    date: new Date().toDateString(),
    from: "testUser1",
    to: "testUser2",
    text: "hi user 2 !!!"
  },
  {
    id: "message2",
    date: new Date().toDateString(),
    from: "testUser2",
    to: "testUser1",
    text: "Hello !! user 1, nice to hear you!"
  },
];
