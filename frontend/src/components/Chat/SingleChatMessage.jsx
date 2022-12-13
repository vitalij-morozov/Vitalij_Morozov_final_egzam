import React from 'react';
import { useSelector } from 'react-redux';

function SingleChatMessage({ message }) {
  const user = useSelector((state) => state.generalStore.user);
  return (
    <div className='chat-message-container'>
      <div
        className='chat-message'
        style={{
          justifySelf: `${message.sender === user.secret ? 'end' : 'start'}`,
          backgroundColor: `${message.sender === user.secret ? '#489b74' : '#89ccad'}`,
        }}
      >
        <h5>{message.senderUsername} :</h5> <p className='chat-message-body'>{message.body}</p>
        <span className='chat-message-date'>{message.createdAt.slice(0, 24)}</span>
      </div>
    </div>
  );
}

export default SingleChatMessage;
