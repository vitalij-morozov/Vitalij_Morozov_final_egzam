import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.generalStore.user);
  const userLikes = useSelector((state) => state.generalStore.userLikes);

  const { username } = user;

  return (
    <header>
      <div className='container'>
        <h1 className='logo' onClick={() => navigate('/')}>
          Pretender
        </h1>

        <div className='profile' onClick={() => navigate('/profile')}>
          <h3 className='avatar'>{username.charAt(0)}</h3>
          <h2 className='header_username'>{username}</h2>
          <span>Likes: {userLikes.length}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
