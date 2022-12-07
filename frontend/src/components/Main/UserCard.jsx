import React from 'react';

import CardCarousel from './CardCarousel';
import CardButtons from './CardButtons';

function UserCard({ user, socket }) {
  return (
    <div className='card'>
      <CardCarousel user={user} />
      <CardButtons userId={user.secret} socket={socket} />
    </div>
  );
}

export default UserCard;
