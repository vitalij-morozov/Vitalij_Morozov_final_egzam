import React, { useRef } from 'react';

function ChatForm({ socket }) {
  const chatRef = useRef();

  const handleChatMessageSubmit = (e) => {
    e.preventDefault();
    const message = chatRef.current.value;

    socket.emit('newMessage', message);

    chatRef.current.value = '';
  };

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
