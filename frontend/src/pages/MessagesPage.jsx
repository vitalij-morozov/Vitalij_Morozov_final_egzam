import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setUserMessages } from '../store/generalStore';

import MessagesContainer from '../components/Messages/MessagesContainer';

function MessagesPage({ socket }) {
  const user = useSelector((state) => state.generalStore.user);
  const userMessages = useSelector((state) => state.generalStore.userMessages);

  const dispatch = useDispatch();

  useEffect(() => {
    user && socket.emit('messages', { receiverId: user.secret });
  }, [socket, user]);

  useEffect(() => {
    socket.on('getMessages', (data) => {
      dispatch(setUserMessages(data));
    });
  }, [dispatch, socket]);

  return (
    <div className='messages-page container page'>
      <MessagesContainer messages={userMessages} />
    </div>
  );
}

export default MessagesPage;
