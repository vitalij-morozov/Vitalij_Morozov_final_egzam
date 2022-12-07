import React from 'react';
import ProfileImageForm from './ProfileImageForm';
import ImagesPreview from './ImagesPreview';
function UserProfile({ user, images, setImages }) {
  return (
    user && (
      <div className='user_profile'>
        <div className='user-info'>
          <h2 className='profile_username'>{user.username}</h2>
          <ImagesPreview images={images} />
        </div>

        <div className='set-images'>
          <ProfileImageForm setImages={setImages} images={images} />
        </div>
      </div>
    )
  );
}

export default UserProfile;
