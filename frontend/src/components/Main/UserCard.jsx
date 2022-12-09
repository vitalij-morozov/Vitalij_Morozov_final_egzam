import React from 'react';

import CardCarousel from './CardCarousel';
import CardButtons from './CardButtons';

function UserCard({ user, socket, hadleDislikeButtonClick, hadleLikeButtonClick }) {
  return (
    <div className='card'>
      <CardCarousel user={user} />
      {user && (
        <CardButtons
          userId={user.secret}
          socket={socket}
          hadleDislikeButtonClick={hadleDislikeButtonClick}
          hadleLikeButtonClick={hadleLikeButtonClick}
        />
      )}
    </div>
  );
}

export default UserCard;
