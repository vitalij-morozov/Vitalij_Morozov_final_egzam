import React from 'react';

import CardCarousel from './CardCarousel';
import CardButtons from './CardButtons';

function UserCard({ user }) {
  return (
    <div className='card'>
      <CardCarousel user={user} />
      <CardButtons />
    </div>
  );
}

export default UserCard;
