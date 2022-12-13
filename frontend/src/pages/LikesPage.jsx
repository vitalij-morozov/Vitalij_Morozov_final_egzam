import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Likes from '../components/Profile/UserLikes/Likes';
import Matches from '../components/Profile/UserLikes/Matches';
// import { setUserLikes, setUserMatches } from '../store/generalStore';

function LikesPage() {
  const [showComponent, setShowComponent] = useState('likes');
  const userLikes = useSelector((state) => state.generalStore.userLikes);
  const userMatches = useSelector((state) => state.generalStore.userMatches);

  return (
    <div className='likes-page container page'>
      <div className='likes-toolbar'>
        <h2
          className={`likes-info ${showComponent === 'likes' ? 'like-page_selected' : ''}`}
          onClick={() => {
            setShowComponent('likes');
          }}
        >
          Users who you liked: <span className='likes-value'>{userLikes.length}</span>{' '}
        </h2>
        <h2
          className={`likes-info ${showComponent === 'matches' ? 'like-page_selected' : ''}`}
          onClick={() => {
            setShowComponent('matches');
          }}
        >
          Users who liked you: <span className='likes-value'>{userMatches.length}</span>{' '}
        </h2>
      </div>
      {showComponent === 'likes' ? <Likes /> : <Matches />}
    </div>
  );
}

export default LikesPage;
