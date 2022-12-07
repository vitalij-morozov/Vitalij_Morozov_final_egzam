import React, { useRef } from 'react';

function ProfileImageForm({ images, setImages }) {
  const imageRef = useRef();

  const handleAddingImages = (e) => {
    e.preventDefault();
    const img = imageRef.current.value;
    setImages([img, ...images]);
    imageRef.current.value = '';
  };

  return (
    <form className='profile-form'>
      <h4>Add at least two images: </h4>
      <div className='input-container'>
        <label htmlFor=''>Main Image: </label>
        <input ref={imageRef} type='url' name='image1' placeholder='Enter URL of an image' required />
      </div>
      <button type='submit' onClick={handleAddingImages}>
        ADD
      </button>
    </form>
  );
}

export default ProfileImageForm;
