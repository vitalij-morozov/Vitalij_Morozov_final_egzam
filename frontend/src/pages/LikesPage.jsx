import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Likes from '../components/Profile/UserLikes/Likes';
import Matches from '../components/Profile/UserLikes/Matches';
import { setUserLikes, setUserMatches } from '../store/generalStore';

function LikesPage({ socket }) {
  const [showComponent, setShowComponent] = useState('likes');
  const user = useSelector((state) => state.generalStore.user);
  const userLikes = useSelector((state) => state.generalStore.userLikes);
  const userMatches = useSelector((state) => state.generalStore.userMatches);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      socket.emit('likes', user.liked);
      socket.on('getMatches', (data) => {
        console.log('get likes data', data);
        if (!data.error) {
          const filterLikes = data.data.filter((fUser) => !fUser.liked.includes(user.secret));
          const filteredMatches = data.data.filter((fUser) => fUser.liked.includes(user.secret));
          dispatch(setUserLikes(filterLikes));
          dispatch(setUserMatches(filteredMatches));
        }
      });
    }
  }, [socket, user]);

  return (
    <div className='likes-page container page'>
      <div className='likes-toolbar'>
        <h2
          className={`likes-info ${showComponent === 'likes' ? 'like-page_selected' : ''}`}
          onClick={() => {
            setShowComponent('likes');
          }}
        >
          Your likes: <span className='likes-value'>{userLikes.length}</span>{' '}
        </h2>
        <h2
          className={`likes-info ${showComponent === 'matches' ? 'like-page_selected' : ''}`}
          onClick={() => {
            setShowComponent('matches');
          }}
        >
          Your matches: <span className='likes-value'>{userMatches.length}</span>{' '}
        </h2>
      </div>
      {showComponent === 'likes' ? <Likes /> : <Matches />}
    </div>
  );
}

export default LikesPage;
