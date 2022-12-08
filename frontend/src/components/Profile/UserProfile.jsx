import React from 'react';
import ProfileImageForm from './ProfileImageForm';
import ImagesPreview from './ImagesPreview';
import { Link } from 'react-router-dom';
function UserProfile({ user, images, setImages }) {
  return (
    user && (
      <div className='user_profile'>
        <div className='user-info'>
          <div className='profile-carousel'>
            <ImagesPreview images={images} />
          </div>
          <h2 className='profile_username'>{user.username}</h2>
          <Link to='/profile/messages'>
            Messages <span className='value'>0</span>
          </Link>
          <Link to='/profile/likes'>
            Likes (<span className='value'>0</span>) & Matches (<span className='value'>0</span>)
          </Link>
        </div>

        <div className='set-images'>
          <ProfileImageForm setImages={setImages} images={images} />
        </div>
      </div>
    )
  );
}

export default UserProfile;
