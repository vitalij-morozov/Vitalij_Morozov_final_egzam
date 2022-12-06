import React from 'react';
import ProfileImageForm from './ProfileImageForm';
import ImagesPreview from './ImagesPreview';
function UserProfile() {
  return (
    <div className='user_profile'>
      <h2 className='profile_username'>Test</h2>
      <ProfileImageForm />
      <ImagesPreview />
    </div>
  );
}

export default UserProfile;
