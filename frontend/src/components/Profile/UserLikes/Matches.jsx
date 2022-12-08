import React from 'react';
import { useSelector } from 'react-redux';
import UserLikesCarouselCard from './UserLikesCarouselCard';

function Matches() {
  const userMatches = useSelector((state) => state.generalStore.userMatches);

  return (
    <div className='likes-matches'>
      {userMatches.length > 0 ? (
        userMatches.map((match, idx) => <UserLikesCarouselCard type={'matches'} user={match} key={idx} />)
      ) : (
        <h2>Sorry, but you have no matches yet</h2>
      )}
    </div>
  );
}

export default Matches;
