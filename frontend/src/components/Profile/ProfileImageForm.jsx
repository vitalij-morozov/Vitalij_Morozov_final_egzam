import React from 'react';

function ProfileImageForm() {
  return (
    <form className='profile-form'>
      <div className='input-container'>
        <label htmlFor='image'>Image: </label>
        <input type='url' name='image' placeholder='Enter URL of an image' required />
      </div>
      <button type='submit'>ADD</button>
    </form>
  );
}

export default ProfileImageForm;
