import { FormEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { UseQueryResult, useMutation, useQuery, useQueryClient } from 'react-query';
import { Contact, Dialog, MessageInput } from '../../components';
import { createUser, getMessages, getUsers } from '../../api';

import type { Message, User } from '../../types';

import ReactSVG from '../../assets/react.svg';
import './style.css';
import { SocketApi } from '../../api/socket-api';

const mocUser = {
  name: 'testUser1',
  id: '',
} // TODO: заменить на запрос юзера с сервера по токену

export const MessengerPage = () => {
  const [user, setUser] = useState(mocUser);
  const [newUser, setNewUser] = useState('new user');
  const [open, setOpen] = useState(false);
  const [currentDialog, setCurrentDialog] = useState('');

  const allMessages = useQuery('messages', getMessages);
  const allUsers = useQuery('users', getUsers);

  const queryClient = useQueryClient();

  const handleNewMessage = useCallback((res: Message) => {
    if (res.id) {
      const currentMessages = queryClient.getQueryData<Message[]>('messages');
      const updatedMessages = [...(currentMessages || []), res];
      queryClient.setQueryData('messages', updatedMessages);
    }
  }, [queryClient]);

  const handleDellMessage = useCallback((res: Message) => {
    if (res.id) {
      const currentMessages = queryClient.getQueryData<Message[]>('messages');
      const updatedMessages = (currentMessages || []).filter(item => item.id !== res.id);
      queryClient.setQueryData('messages', updatedMessages);
    }
  }, [queryClient]);

  useEffect(() => {
    SocketApi.setHandleNewMessage(handleNewMessage);
    SocketApi.setHandleDellMessage(handleDellMessage);
  }, [handleDellMessage, handleNewMessage]);

  const mutation = useMutation(createUser, {
    onSuccess: (newUser) => {
      const currentUsers = queryClient.getQueryData<User[]>('users');
      const updatedUsers = [...(currentUsers || []), newUser];
      queryClient.setQueryData('users', updatedUsers);
    },
    onError: () => {
      alert('Ошибка создания пользователя');
    }
  });
  const createUserHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutation.mutate({ name: newUser });
    setNewUser('');
    setOpen(false);
  };

  const {
    data: users,
    isError: userError,
    isLoading: userLoading
  }: UseQueryResult<User[], unknown> = allUsers;


  useEffect(() => {
    const me = users?.find(item => item.name === user.name);
    if (me) {
      setUser(me)
    }
  }, [user, users]);

  if (userError) alert('User error');

  const messages = useMemo(() => {
    if (!allMessages.isError && allMessages.data)
      return allMessages.data.filter(message => message.from === currentDialog || message.to === currentDialog)
  }, [allMessages.data, allMessages.isError, currentDialog]);

  const checkDialogHandler = (id: string) => {
    setCurrentDialog(id)
  };
  const handleOpen = () => setOpen(true);

  return (
    <section className='messenger'>
      <div className='container user'>
        <div className="userCard">
          <p className='desc'>you</p>
          <div className='userContainer'>
            <div className="userPhoto">🧑</div>
            <input
              form="inputWindow"
              required
              className="userName"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
        </div>
        <div onClick={handleOpen} className={`createCard ${open && 'createCardOpen'}`}>
          <p className='createDesc'>create user</p>
          <form id="createUser" className="userContainer" onSubmit={createUserHandler}>
            <div className="createPhoto">🧑</div>
            <input
              form="createUser"
              required
              className="createName"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
            />
            <button className="createUserBtn" type='submit'>ok</button>
          </form>
        </div>
        {users && <div className='contacts'>
          {users.filter(item => item.id !== user.id).map((user) =>
            <Contact user={user} onClick={checkDialogHandler} key={user.id} active={user.id === currentDialog} />)}
        </div>}
      </div>
      <div className='container viewer'>
        {currentDialog && messages &&
          <>
            <Dialog messages={messages} me={user.id} />
            <MessageInput currentUser={user.id} currentDialog={currentDialog} />
          </>
        }
      </div>
      {userLoading &&
        <div className='loaderContainer'>
          <img className='imageLoader' src={ReactSVG} alt="loader" height="50%" width="50%" />
        </div>}
    </section>
  );
};
