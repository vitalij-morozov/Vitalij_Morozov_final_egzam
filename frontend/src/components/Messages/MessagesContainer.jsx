import React from 'react';
import SingleMessage from './SingleMessage';

function MessagesContainer({ messages }) {
  return (
    <div className='messages-container'>
      {messages.length > 0 && messages.map((msg, index) => <SingleMessage key={index} message={msg} />)}
    </div>
  );
}

export default MessagesContainer;
