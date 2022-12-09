import React, { useState } from 'react';
import { BsChevronCompactRight, BsChevronCompactLeft, BsTrashFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import http from '../../plugins/http';

function ImagesPreview({ images, setImages }) {
  const url = useSelector((state) => state.generalStore.baseURL);
  const user = useSelector((state) => state.generalStore.user);

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

  const handleImageRemoval = async () => {
    await http
      .patch(`${url}/users/removeImage`, { userId: user.secret, image: images[counter] })
      .then((data) => {
        if (!data.error) {
          console.log('data ===', data);
          setImages(images.filter((image) => image !== images[counter]));
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className='preview-container'>
      {images.length > 0 ? (
        <div className='preview-image' style={{ backgroundImage: `url(${images[counter]})` }}>
          <button className='delete-photo-btn' title='delete photo' onClick={handleImageRemoval}>
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
