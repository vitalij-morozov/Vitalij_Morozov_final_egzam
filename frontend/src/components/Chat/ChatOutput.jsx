import React from 'react';
import SingleChatMessage from './SingleChatMessage';

function ChatOutput({ chatMessages }) {
  return (
    <div className='chat-output'>
      {chatMessages.length > 0 ? (
        chatMessages
          .sort((a, b) => a.createdAt - b.createdAt)
          .map((message, index) => <SingleChatMessage key={index} message={message} />)
      ) : (
        <h2>No Messages Yet</h2>
      )}
    </div>
  );
}

export default ChatOutput;
