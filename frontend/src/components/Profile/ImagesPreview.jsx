import React, { useState } from 'react';
import { BsChevronCompactRight, BsChevronCompactLeft, BsTrashFill } from 'react-icons/bs';

function ImagesPreview({ images }) {
  const [counter, setCounter] = useState(0);

  const handlePhotoChangeLeft = () => {
    setCounter(counter - 1);

    if (counter === images.length) {
      setCounter(0);
    }
    if (counter === 0) {
      setCounter(images.length - 1);
    }
  };

  const handlePhotoChangeRight = () => {
    setCounter(counter + 1);

    if (counter === images.length - 1) {
      setCounter(0);
    }
  };

  return (
    <div className='preview-container'>
      {images.length > 0 ? (
        <div className='preview-image' style={{ backgroundImage: `url(${images[counter]})` }}>
          <button className='delete-photo-btn' title='delete photo'>
            <BsTrashFill />
          </button>
          <div className='control-buttons'>
            <button onClick={handlePhotoChangeLeft}>
              <BsChevronCompactLeft />
            </button>
            <button onClick={handlePhotoChangeRight}>
              <BsChevronCompactRight />
            </button>
          </div>
        </div>
      ) : (
        <img src='https://img.freepik.com/free-icon/man_318-677829.jpg?w=2000' alt='default img' />
      )}
    </div>
  );
}

export default ImagesPreview;
