import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../store/generalStore';
import http from '../../plugins/http';

function ProfileImageForm({ images, setImages }) {
  const imageRef = useRef();
  const user = useSelector((state) => state.generalStore.user);
  const url = useSelector((state) => state.generalStore.baseURL);

  const dispatch = useDispatch();

  const handleAddingImages = (e) => {
    e.preventDefault();
    const img = imageRef.current.value;
    console.log('img ===', img);
    if (!img) return alert('Please enter an image URL');
    setImages([img, ...images]);
    http.patch(`${url}/users/${user.secret}`, { image: img }).then((data) => {
      console.log('patch data ===', data);
      dispatch(setUser(data.data));
    });
    imageRef.current.value = '';
  };

  return (
    <form className='profile_form'>
      <h4>You shold have at least two images: </h4>
      <div className='input-container'>
        <input ref={imageRef} type='url' name='image1' placeholder='Enter URL of an image' required />
      </div>
      <button type='submit' onClick={handleAddingImages} className='profile_form-btn'>
        ADD PHOTO
      </button>
    </form>
  );
}

export default ProfileImageForm;
