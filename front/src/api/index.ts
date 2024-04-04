import axios from "axios";
import { Message, User } from "../types";

// # messages 
export const getMessages = async (): Promise<Message[]> => {
  const { data } = await axios.get(`api/messages`);
  return data;
};
export const sendMessage = async (data: Partial<Message>) => {
  const response = await axios.post('/api/messages', data);
  return response.data;
};
export const deleteMessage = async (id: Message["id"]) => {
  const response = await axios.delete(`/api/messages/${id}`);
  return response.data;
};
// users 
export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get(`api/users`);
  return data;
};
export const createUser = async (data: Partial<User>) => {
  const response = await axios.post('/api/users', data);
  return response.data;
};

