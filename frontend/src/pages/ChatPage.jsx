import React from 'react';
import ChatForm from '../components/Chat/ChatForm';
import ChatOutput from '../components/Chat/ChatOutput';

function ChatPage() {
  return (
    <div className='chat-page container page'>
      <div className='chat-container'>
        <ChatOutput />
        <ChatForm />
      </div>
    </div>
  );
}

export default ChatPage;
