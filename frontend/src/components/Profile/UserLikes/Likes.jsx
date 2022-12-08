import React from 'react';
import { useSelector } from 'react-redux';

import UserLikesCarouselCard from './UserLikesCarouselCard';

function Likes() {
  const userLikes = useSelector((state) => state.generalStore.userLikes);
  return (
    <div className='likes-matches'>
      {userLikes.length > 0 ? (
        userLikes.map((like, idx) => <UserLikesCarouselCard type={'likes'} user={like} key={idx} />)
      ) : (
        <h2>Sorry, but you didn't like anyone.</h2>
      )}
    </div>
  );
}

export default Likes;
