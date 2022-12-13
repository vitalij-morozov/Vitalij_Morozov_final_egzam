import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/generalStore';
import { ImExit } from 'react-icons/im';

function Header() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.generalStore.user);
  const userLikes = useSelector((state) => state.generalStore.userLikes);
  const userMatches = useSelector((state) => state.generalStore.userMatches);

  const { username } = user;

  const handleLogOut = () => {
    dispatch(setUser(null));
    localStorage.removeItem('user');
    sessionStorage.clear();
    navigate('/auth');
  };

  return (
    <header>
      <div className='container'>
        <div className='logo'>
          <h1 onClick={() => navigate('/')}>Pretender</h1>
          <p className='sub-logo'>A Place For Movie Characters To Meet Movie Characters</p>
        </div>

        <div className='profile'>
          <h3 className='avatar' onClick={() => navigate('/profile')}>
            {username.charAt(0)}
          </h3>
          <h2 className='header_username'>{username}</h2>
          <span className='header_link' onClick={() => navigate('/profile/likes')}>
            Liked By Me: <span className='link_value'> {userLikes.length}</span>
          </span>
          <span className='header_link' onClick={() => navigate('/profile/likes')}>
            Liked Me: <span className='link_value'> {userMatches.length}</span>
          </span>
          <button onClick={handleLogOut} className='log-out-btn'>
            Log Out
            <span>
              <ImExit />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
