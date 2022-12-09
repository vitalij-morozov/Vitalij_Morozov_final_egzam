import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChatForm from '../components/Chat/ChatForm';
import ChatOutput from '../components/Chat/ChatOutput';

function ChatPage({ socket }) {
  const user = useSelector((state) => state.generalStore.user);

  const { toUser } = useParams();

  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    socket.emit('chatMessages', { senderId: user.secret, receiverId: toUser });
  }, []);

  useEffect(() => {
    socket.on('getChatMessages', (data) => {
      setChatMessages(data.flat());
    });
  }, [socket]);
  return (
    <div className='chat-page container page'>
      <div className='chat-container'>
        <ChatOutput chatMessages={chatMessages} />
        <ChatForm socket={socket} chatMessages={chatMessages} setChatMessages={setChatMessages} receiver={toUser} />
      </div>
    </div>
  );
}

export default ChatPage;
