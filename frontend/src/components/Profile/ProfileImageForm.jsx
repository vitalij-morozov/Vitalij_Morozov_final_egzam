import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import http from '../../plugins/http';

function ProfileImageForm({ images, setImages }) {
  const imageRef = useRef();
  const user = useSelector((state) => state.generalStore.user);
  const url = useSelector((state) => state.generalStore.baseURL);

  const handleAddingImages = (e) => {
    e.preventDefault();
    const img = imageRef.current.value;
    console.log('img ===', img);
    setImages([img, ...images]);
    http.patch(`${url}/users/${user.secret}`, { image: img }).then((data) => {
      console.log('patch data ===', data);
    });
    imageRef.current.value = '';
  };

  return (
    <form className='profile_form'>
      <h4>Add at least two images: </h4>
      <div className='input-container'>
        <input ref={imageRef} type='url' name='image1' placeholder='Enter URL of an image' required />
      </div>
      <button type='submit' onClick={handleAddingImages} className='profile_form-btn'>
        ADD
      </button>
    </form>
  );
}

export default ProfileImageForm;
