import React, { useState } from 'react';
import Likes from '../components/Profile/UserLikes/Likes';
import Matches from '../components/Profile/UserLikes/Matches';

function LikesPage() {
  const [showComponent, setShowComponent] = useState('likes');

  return (
    <div className='likes-page container page'>
      <div className='likes-toolbar'>
        <h2
          className={`likes-info ${showComponent === 'likes' ? 'like-page_selected' : ''}`}
          onClick={() => {
            setShowComponent('likes');
          }}
        >
          Your likes: <span className='likes-value'>2</span>{' '}
        </h2>
        <h2
          className={`likes-info ${showComponent === 'matches' ? 'like-page_selected' : ''}`}
          onClick={() => {
            setShowComponent('matches');
          }}
        >
          Your matches: <span className='likes-value'>0</span>{' '}
        </h2>
      </div>
      {showComponent === 'likes' ? <Likes /> : <Matches />}
    </div>
  );
}

export default LikesPage;
