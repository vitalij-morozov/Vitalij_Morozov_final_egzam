import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function ChatForm({ socket, chatMessages, setChatMessages, receiver }) {
  const chatRef = useRef();

  const user = useSelector((state) => state.generalStore.user);

  const handleChatMessageSubmit = (e) => {
    e.preventDefault();
    const message = {
      body: chatRef.current.value,
      sender: user.secret,
      receiver: receiver,
      createdAt: new Date().toString(),
    };

    socket.emit('newMessage', message);

    chatRef.current.value = '';
  };
  useEffect(() => {
    socket.on('getNewMessageData', (data) => {
      console.log('getNewMessageData data ===', data);
      setChatMessages((chatMessages) => [data, ...chatMessages]);
    });
  }, [socket]);
  console.log('chatMessages ===', chatMessages);
  return (
    <form className='chat-form'>
      <div className='input-container'>
        <textarea
          ref={chatRef}
          name='chat-input'
          id='chat-input'
          cols='30'
          rows='4'
          placeholder='Type message here'
        ></textarea>
      </div>
      <button type='submit' onClick={handleChatMessageSubmit}>
        SEND
      </button>
    </form>
  );
}

export default ChatForm;
