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
      .post(`${url}/users/removeImage`, { userId: user.secret, image: images[counter] })
      .then((data) => {
        if (!data.error) {
          setImages(images.filter((image) => image !== images[counter]));
          setCounter(0);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='preview-container'>
      {
        <div
          className='preview-image'
          style={{
            backgroundImage: `url(${
              images.length > 0
                ? images[counter]
                : 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg'
            })`,
          }}
        >
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
      }
    </div>
  );
}

export default ImagesPreview;
