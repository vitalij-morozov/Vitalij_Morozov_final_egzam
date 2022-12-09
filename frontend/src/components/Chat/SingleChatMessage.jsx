import React from 'react';

function SingleChatMessage({ message }) {
  return <div className='chat-message'>{`${message.body} ${message.sender}`}</div>;
}

export default SingleChatMessage;
