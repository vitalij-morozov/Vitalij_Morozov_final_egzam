import React from 'react';
import ProfileImageForm from './ProfileImageForm';
import ImagesPreview from './ImagesPreview';
function UserProfile({ user, images, setImages }) {
  return (
    user && (
      <div className='user_profile'>
        <h2 className='profile_username'>{user.username}</h2>
        <ProfileImageForm setImages={setImages} images={images} />
        <ImagesPreview images={images} />
      </div>
    )
  );
}

export default UserProfile;
