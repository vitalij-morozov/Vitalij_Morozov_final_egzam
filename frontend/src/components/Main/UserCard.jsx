import React from 'react';

import CardCarousel from './CardCarousel';
import CardButtons from './CardButtons';

function UserCard() {
  return (
    <div className='card'>
      <CardCarousel />
      <CardButtons />
    </div>
  );
}

export default UserCard;
