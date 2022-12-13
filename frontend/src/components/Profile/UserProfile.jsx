import React from 'react';
import ImagesPreview from './ImagesPreview';
import { Link } from 'react-router-dom';

function UserProfile({ user, images, setImages }) {
  return (
    user && (
      <div className='user_profile'>
        <div className='user-info'>
          <div className='profile-carousel'>
            <ImagesPreview images={images} setImages={setImages} />
          </div>
          <h2 className='profile_username'>{user.username}</h2>
          <Link to='/profile/messages' className='profile_link'>
            My Messages
          </Link>
          <Link to='/profile/likes' className='profile_link'>
            Liked By Me (<span className='value'>{user.liked.length}</span>) & Liked Me (
            <span className='value'>{user.likes.length}</span>)
          </Link>
        </div>
      </div>
    )
  );
}

export default UserProfile;
