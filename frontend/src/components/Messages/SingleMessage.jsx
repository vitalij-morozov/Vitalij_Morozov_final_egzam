import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SingleMessage({ message }) {
  const navigate = useNavigate();
  const { body, senderUsername, sender } = message;
  return (
    <div className='message' onClick={() => navigate(`/profile/chat/${sender}`)}>
      <h5 className='message-sender'>{senderUsername} </h5>
      <p className='message-body'>{body}</p>
    </div>
  );
}
